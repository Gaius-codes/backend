import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

// register function
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // check if user already exists via email cause it's @unique
  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });

  if (userExists) {
    return res
      .status(400)
      .json({ error: "User already exists with this email address." });
  }

  // hash password with bcrypt (done the same way always)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user / add user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // generate JWT
  const token = generateToken(user.id, res);

  res.status(201).json({
    status: "success",
    data: {
      id: user.id,
      name: name,
      email: email,
    },
    token,
  });
};

// login function implemented here
const login = async (req, res) => {
  const { email, password } = req.body;

  // check if user email exists in the table
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    res.status(401).json({
      error: "Invalid email or password",
    });
  }

  // verify password with bcrypt
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(401).json({
      res: "Invalid email or password ",
    });
  }

  // generate JWT
  const token = generateToken(user.id, res);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        email: email,
      },
      token,
    },
  });
};

const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    status: "success",
    message: "logged out successfully",
  });
};

export { register, login, logout };

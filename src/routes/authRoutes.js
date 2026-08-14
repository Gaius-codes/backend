import express from "express";
import { register, login, logout } from "../controller/authController.js";
import { loginSchema, registerSchema } from "../validators/authValidators.js";

const router = express.Router();

router.post("/register", registerSchema, register);
router.post("/login", loginSchema, login);
router.post("/logout", logout);

export default router;

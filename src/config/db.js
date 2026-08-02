import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

console.log(process.env.DATABASE_URL);
console.log(typeof process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "info", "warn", "error"]
      : ["error"],
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("DB connected via Prisma");
  } catch (err) {
    console.error(`DB connection error: ${err}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
};

export { prisma, connectDB, disconnectDB };

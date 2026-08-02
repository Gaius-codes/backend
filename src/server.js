import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";
// import routes
import movieRoutes from "./routes/movieRoutes.js";

config(); // Load environment variables
connectDB();

const app = express();

// API Routes
app.use("/movies", movieRoutes);

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});

// handle unhandled promise rejections (eg. database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});

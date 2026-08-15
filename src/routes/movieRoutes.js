import express from "express";
import {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controller/moviesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  createMovieSchema,
  updateMovieSchema,
} from "../validators/movieValidators.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovie);

router.post(
  "/",
  authMiddleware,
  validateRequest(createMovieSchema),
  createMovie,
);
router.put(
  "/",
  authMiddleware,
  validateRequest(updateMovieSchema),
  updateMovie,
);
router.delete("/:id", authMiddleware, deleteMovie);

export default router;

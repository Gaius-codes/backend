import express from "express";
import {
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlistItem,
} from "../controller/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchlistSchema } from "../validators/watchlistValidator.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateRequest(addToWatchlistSchema), addToWatchlist);

router.put("/:id", updateWatchlistItem);

router.delete("/:id", removeFromWatchlist);

export default router;

import express from "express";
import { addToWatchlist, removeFromWatchlist } from "../controller/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", addToWatchlist);

router.delete("/:id", removeFromWatchlist)

export default router;

import express from "express";
import { addNewWishlist, getAllWishlist, getWishlistById } from "../services/watchlist.service.js";
const router = express.Router();


router.post('/add', addNewWishlist);
router.get("/", getAllWishlist);
router.get("/:id", getWishlistById);

export default router;

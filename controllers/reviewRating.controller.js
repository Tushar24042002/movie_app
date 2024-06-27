import express from "express";
import { addReviewRating, getReviewById } from "../services/reviewRating.service.js";
const router = express.Router();


// Route to create a new user
router.post('/add', addReviewRating);
router.get('/review/:id', getReviewById);

export default router;

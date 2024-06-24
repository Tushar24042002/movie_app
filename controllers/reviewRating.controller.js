import express from "express";
import { addReviewRating } from "../services/reviewRating.service.js";
const router = express.Router();


// Route to create a new user
router.post('/add', addReviewRating);

export default router;

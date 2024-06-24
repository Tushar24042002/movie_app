import express from "express";
import { addIndustry, getAllIndustry, getIndustryById } from "../services/industry.service.js";
const router = express.Router();


// Route to create a new user
router.post('/add', addIndustry);
router.get("/", getAllIndustry);
router.get("/:id", getIndustryById);

export default router;

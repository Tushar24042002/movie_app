import express from "express";
import { addNewMovie, editOrUpdateMovie, getAllMovies, getMovieById } from "../services/movie.service.js";
const router = express.Router();


// Route to create a new user
router.post('/add', addNewMovie);
router.post('/update/:id', editOrUpdateMovie);
router.get("/", getAllMovies);
router.get("/:id", getMovieById);

export default router;

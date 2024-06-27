import express from "express";
import { addMovieToWatched, addNewMovie, deleteMovies, editOrUpdateMovie, getAllMovies, getMovieById, getWatchListMovies, getWatchedMovies } from "../services/movie.service.js";
const router = express.Router();


// Route to create a new user
router.post('/add', addNewMovie);
router.post('/update/:id', editOrUpdateMovie);
router.get("/", getWatchListMovies);
router.get("/movie/:id", getMovieById);
router.post("/watch/:id", addMovieToWatched);
router.get("/watched", getWatchedMovies);
router.post("/delete/:id", deleteMovies);


export default router;

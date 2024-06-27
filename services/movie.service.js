import CustomValidationError from "../Exceptions/CustomException.js";
import { addMovie, addToWatched, deleteMovie, fetchMovies, findAllMovies, findMovieById, updateMovie } from "../repository/movie.repository.js";
import { getCurrentUser } from "./user.service.js";

export const addNewMovie = async (req, res, next) => {
    try {
        const newUser = await addMovie(req, res);
        res.status(201).json(newUser);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            next(new CustomValidationError(error.errors));
        } else {
            next(error);
        }
    }
}


export const addMovieToWatched = async (req, res, next) => {
    try {
        const newUser = await addToWatched(req, res);
        res.status(201).json(newUser);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            next(new CustomValidationError(error.errors));
        } else {
            next(error);
        }
    }
}


export const editOrUpdateMovie = async (req, res, next) => {
    try {
        const newUser = await updateMovie(req);
        res.status(201).json(newUser);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            next(new CustomValidationError(error.errors));
        } else {
            next(error);
        }
    }
}



export const getAllMovies = async (req, res) => {
    try {
        const allUsers = await findAllMovies();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getWatchedMovies = async (req, res) => {
    try {
      const user = await getCurrentUser(req, res);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const watchedMovies = await fetchMovies(user.id, true);
      return res.json(watchedMovies);
    } catch (error) {
      console.error('Error fetching watched movies:', error);
      return res.status(500).json({ error: 'An error occurred while fetching watched movies' });
    }
  };


  export const getWatchListMovies = async (req, res) => {
    try {
      const user = await getCurrentUser(req, res);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const watchedMovies = await fetchMovies(user.id, false);
      console.log(watchedMovies , "dajfn n")
      return res.json(watchedMovies);
    } catch (error) {
      console.error('Error fetching watched movies:', error);
      return res.status(500).json({ error: 'An error occurred while fetching watched movies' });
    }
  };

export const getMovieById= async(req, res)=>{
    const movieId = req.params.id;
    try {
        const employer = await findMovieById(movieId);
        if (!employer) {
            throw new CustomValidationError([{ message: 'Movie  not found sorry' }]);
        }
        res.status(200).json(employer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const deleteMovies = async (req, res, next) => {
    try {
        await deleteMovie(req, res);
        res.status(200).json({message :"Delete Successfully"});
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            next(new CustomValidationError(error.errors));
        } else {
            next(error);
        }
    }
}
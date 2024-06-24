import CustomValidationError from "../Exceptions/CustomException.js";
import { addMovie, findAllMovies, findMovieById, updateMovie } from "../repository/movie.repository.js";

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


export const getMovieById= async(req, res)=>{
    const movieId = req.params.id;
    try {
        const employer = await findMovieById(movieId);
        if (!employer) {
            throw new CustomValidationError([{ message: 'Movie  not found' }]);
        }
        res.status(200).json(employer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


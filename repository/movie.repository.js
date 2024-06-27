import { Sequelize } from "sequelize";
import sequelize from "../config.js";
import Movie from "../models/Movie.js"
import ReviewRating from "../models/ReviewRating.js";
import UserMovie from "../models/UserMovies.js";
import WatchlistItem from "../models/WatchlistItem.js";
import { getCurrentUser } from "../services/user.service.js";
// import UserMovie from './models/UserMovie.js';

// import { getCurrentUser } from './utils/auth.js';

export const addMovie = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const movieData = await Movie.create(req.body, { transaction });
    const user = await getCurrentUser(req, res);
    if (!user) {
      throw new Error('User not found');
    }

    await UserMovie.create(
      {
        userId: user.id,
        movieId: movieData.id,
      },
      { transaction }
    );

    await WatchlistItem.create({
      userId: user.id,
      movieId: movieData.id,
      watched: false
    }, { transaction });

    await transaction.commit();
    return movieData;
  } catch (error) {
    await transaction.rollback();
    console.error('Error adding movie:', error);
    return res.status(500).json({ error: 'An error occurred while adding the movie' });
  }
};

export const updateMovie = async (req) => {
  const { id } = req.params;
  const data = await Movie.update(req.body, {
    where: { id },
    returning: true,
    plain: true,
  });
  return data[1];
};

export const addToWatched = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getCurrentUser(req, res);
    
    const [updatedCount] = await WatchlistItem.update(
      { watched: true },
      {
        where: {
          userId: user.id,
          movieId: id
        }
      }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ message: 'Watchlist item not found or already marked as watched.' });
    }

    res.status(200).json({ message: 'Movie marked as watched successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.', error: error.message });
  }
};




export const findAllMovies= async()=>{
        return await Movie.findAll();
}

export const fetchMovies = async (userId, condition) => {
  console.log(userId)
  return await Movie.findAll({
    include: [{
      model: WatchlistItem,
      where: {
        userId: userId,
        watched: condition,
      },
      attributes: ['watched'], 
    },
    {
      model: ReviewRating,
      where: {
        userId: userId,
        movieId: Sequelize.col('Movie.id'),
      },
      attributes: ['rating', 'review'], 
      required: false,
    },
  ],
    attributes: ['id', 'title', 'genre','description', 'release_year'] 
  });
};


export const findMovieById = async(id)=>{
        return await Movie.findByPk(id);
}

export const findReviewById = async(id)=>{
  return await ReviewRating.findOne({
    where :{
      movieId : id
    }
  });
}


export const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getCurrentUser(req, res);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    await UserMovie.destroy({
      where: {
        movieId: id,
        userId : user.id
      },
    });
    await WatchlistItem.destroy({
      where: {
        movieId: id,
        userId : user.id
      },
    });
    const deletedMovieCount = await Movie.destroy({
      where: {
        id: id,
      },
    });

    if (deletedMovieCount === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    return "delete successsfuly"; // Successful deletion, no content to return
  } catch (error) {
    console.error('Error deleting movie:', error);
    return res.status(500).json({ error: 'An error occurred while deleting the movie' });
  }
};
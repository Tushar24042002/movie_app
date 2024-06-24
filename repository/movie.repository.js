import sequelize from "../config.js";
import Movie from "../models/Movie.js"
import UserMovie from "../models/UserMovies.js";
import { getCurrentUser } from "../services/user.service.js";
// import UserMovie from './models/UserMovie.js';

// import { getCurrentUser } from './utils/auth.js';

export const addMovie = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const movieData = await Movie.create(req.body, { transaction });
    const user =  await getCurrentUser(req, res);
    console.log(user, "user") 
    if (!user) {
      throw new Error('User not found');
    }

    const userMovieMapping = await UserMovie.create(
      {
        userId: user.id,
        movieId: movieData.id,
      },
      { transaction }
    );

    await transaction.commit();
    return movieData;
  } catch (error) {
    await transaction.rollback(); 
    throw error; 
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
export const findAllMovies= async()=>{
        return await Movie.findAll();
}

export const findMovieById = async(id)=>{
        return await Movie.findByPk(id);
}
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
import User from './User.js';
import Movie from './Movie.js';

class ReviewRating extends Model {}

ReviewRating.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Movie,
      key: 'id',
    },
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  review: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'ReviewRating',
  uniqueKeys: {
    unique_review: {
      fields: ['userId', 'movieId'],
    },
  },
});

export default ReviewRating;

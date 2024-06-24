import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
import User from './User.js';
import Movie from './Movie.js';

class WatchlistItem extends Model {}

WatchlistItem.init({
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
  watched: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'WatchlistItem',
});

export default WatchlistItem;

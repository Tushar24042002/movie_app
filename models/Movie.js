import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';

class Movie extends Model {}

Movie.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: " name is required"
      },
      notEmpty: {
        msg: " name is required"
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: " description is required"
      },
      notEmpty: {
        msg: " description is required"
      }
    }
  },
  release_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Release year is required"
      },
      notEmpty: {
        msg: "Release year is required"
      }
    }
  },
  genre: {
    type: DataTypes.ENUM('Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'),
    allowNull : false,
    validate: {
      notNull: {
        msg: "Company name is required"
      },
      notEmpty: {
        msg: "Company name is required"
      }
    }
  },
}, {
  sequelize,
  modelName: 'Movie',
});
export default Movie;

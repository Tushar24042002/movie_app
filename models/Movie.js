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
        msg: "Company name is required"
      },
      notEmpty: {
        msg: "Company name is required"
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Company description is required"
      },
      notEmpty: {
        msg: "Company description is required"
      }
    }
  },
  release_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Company website is required"
      },
      notEmpty: {
        msg: "Company website is required"
      }
    }
  },
  genre: {
    type: DataTypes.ENUM('admin', 'employer', 'job_seeker'),
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

import { DataTypes, Model } from "sequelize";
import sequelize from "../config.js";
import Movie from "./Movie.js";
import User from "./User.js";

class UserMovie extends Model {}

UserMovie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    movieId: {
      type: DataTypes.INTEGER,
      references: {
        model: Movie,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "UserMovie",
  }
);
export default UserMovie;

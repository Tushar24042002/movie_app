import { Sequelize } from "sequelize";

 const sequelize = new Sequelize('movie_watchlist', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
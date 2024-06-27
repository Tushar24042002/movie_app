// import { Sequelize } from "sequelize";

//  const sequelize = new Sequelize('sql12716419', 'sql12716419', 'wFdP81CnQz', {
//   host: 'sql12.freemysqlhosting.net	',
//   dialect: 'mysql',
//   port: 3306,
// });

// export default sequelize;


// database.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mysql://root:lLPtJNHrdxvEOVlyXqMVvYDKajLUdGiy@roundhouse.proxy.rlwy.net:54665/railway');

export default sequelize;

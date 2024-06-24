// models/Job.js

import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js'; // Adjust path as per your structure
import Industry from './Industry.js'; // Adjust path as per your structure

class Job extends Model {}

Job.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  employerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'EmployerProfile', // Name of the model
      key: 'id',
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  requirements: {
    type: DataTypes.TEXT,
  },
  location: {
    type: DataTypes.STRING,
  },
  salary: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Job',
});
Job.belongsToMany(Industry, {
  through: 'JobIndustry', // This is the name of the join table
  foreignKey: 'jobId',
});
export default Job;

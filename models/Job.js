import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
import EmployerProfile from './EmployerProfile.js';

class Job extends Model {}

Job.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  employerId: {
    type: DataTypes.INTEGER,
    references: {
      model: EmployerProfile,
      key: 'id',
    },
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

export default Job;

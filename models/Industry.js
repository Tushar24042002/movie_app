// models/Industry.js

import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js'; // Adjust path as per your structure

class Industry extends Model {}

Industry.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Industry',
});

export default Industry;

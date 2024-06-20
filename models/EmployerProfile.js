const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config');
const User = require('./User');

class EmployerProfile extends Model {}

EmployerProfile.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  companyName: {
    type: DataTypes.STRING,
  },
  companyDescription: {
    type: DataTypes.TEXT,
  },
  companyWebsite: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'EmployerProfile',
});

module.exports = EmployerProfile;

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config');
const User = require('./User');

class JobSeekerProfile extends Model {}

JobSeekerProfile.init({
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
  resume: {
    type: DataTypes.TEXT,
  },
  skills: {
    type: DataTypes.TEXT,
  },
  experience: {
    type: DataTypes.TEXT,
  },
}, {
  sequelize,
  modelName: 'JobSeekerProfile',
});

module.exports = JobSeekerProfile;

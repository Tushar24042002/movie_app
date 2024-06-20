const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config');
const Job = require('./Job');
const JobSeekerProfile = require('./JobSeekerProfile');

class Application extends Model {}

Application.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  jobId: {
    type: DataTypes.INTEGER,
    references: {
      model: Job,
      key: 'id',
    },
  },
  jobSeekerId: {
    type: DataTypes.INTEGER,
    references: {
      model: JobSeekerProfile,
      key: 'id',
    },
  },
  status: {
    type: DataTypes.STRING,
  },
  coverLetter: {
    type: DataTypes.TEXT,
  },
}, {
  sequelize,
  modelName: 'Application',
});

module.exports = Application;

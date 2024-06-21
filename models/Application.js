import { DataTypes, Model }  from 'sequelize';
import sequelize  from '../config';
import Job  from './Job';
import JobSeekerProfile  from './JobSeekerProfile';

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

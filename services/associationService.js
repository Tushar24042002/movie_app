// associationService.js

import Job from '../models/Job.js';
import Industry from '../models/Industry.js';
import JobIndustry from '../models/JobIndustry.js';
import sequelize from '../config.js';

export const initializeAssociations = async () => {
  try {
    Job.belongsToMany(Industry, {
      through: JobIndustry,
      foreignKey: 'jobId',
    });

    Industry.belongsToMany(Job, {
      through: JobIndustry,
      foreignKey: 'industryId',
    });

    // Sync models with associations
    await sequelize.sync();
    
    console.log('Database synchronized successfully with associations.');
  } catch (error) {
    console.error('Unable to synchronize the database with associations:', error);
    throw error;
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'isverified', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.removeColumn('Users', 'isverified');
//   }
};

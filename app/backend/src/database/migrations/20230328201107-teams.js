'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      teamName: {
        type: Sequelize.STRING,
        primaryKey: true,
        field: 'team_name',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  },
};

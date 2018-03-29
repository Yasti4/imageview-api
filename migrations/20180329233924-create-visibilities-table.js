'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('visibilities1', {
            name: {
                type: Sequelize.STRING,
                primaryKey: true,
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('visibilities1');
    }
};
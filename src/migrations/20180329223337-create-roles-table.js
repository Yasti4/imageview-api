'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('roles', {
            name: {
                type: Sequelize.STRING,
                primaryKey: true
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('roles');
    }
};
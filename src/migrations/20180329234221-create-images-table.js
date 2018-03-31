'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('images', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            small: {
                type: Sequelize.STRING,
                allowNull: false
            },
            medium: {
                type: Sequelize.STRING,
                allowNull: true
            },
            large: {
                type: Sequelize.STRING,
                allowNull: true
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('images');
    }
};
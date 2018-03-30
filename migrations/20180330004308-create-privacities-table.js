'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('privacity1', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users1',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            search: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'visibilities',
                    key: 'name'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            posts: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'visibilities',
                    key: 'name'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            albums: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'visibilities',
                    key: 'name'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('privacity1');
    }
};
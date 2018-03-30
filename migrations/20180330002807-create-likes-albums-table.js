'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('likes_albums1', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            album_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'albums1',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
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
        });
        queryInterface.addConstraint('likes_albums1', ['album_id', 'user_id'], {
            type: 'unique'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('likes_albums1');
    }
};
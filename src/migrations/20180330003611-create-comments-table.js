'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('comments', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            content: {
                type: Sequelize.STRING,
                allowNull: false
            },
            post_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'posts',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: true
            },
            deleted_at: {
                type: Sequelize.DATE,
                allowNull: true
            },
        });
        queryInterface.addConstraint('comments', ['post_id', 'user_id'], {
            type: 'unique'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('comments');
    }
};
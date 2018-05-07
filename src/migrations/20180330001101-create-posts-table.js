'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        queryInterface.createTable('posts', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true
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
            album_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'albums',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            image_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'images',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            visibility: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'visibilities',
                    key: 'name'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            enable_comments: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
                allowNull: false
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
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('posts');
    }
};
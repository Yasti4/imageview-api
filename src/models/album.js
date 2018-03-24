'use strict';


module.exports = function(sequelize, DataTypes) {
    var Album = sequelize.define('Album', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        visibility: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
            allowNull: true
        },
        deletedAt: {
            type: DataTypes.DATE,
            field: 'deleted_at',
            allowNull: true
        },
    }, {
        tableName: 'albums',
        timestamps: true,
        paranoid: true
    });

    Album.associate = function(models) {
        Album.belongsToMany(models.User, {
            as: 'subscriptions',
            through: 'subscriptions_albums',
            foreignKey: 'album_id',
            otherKey: 'user_id',

        });
        Album.belongsToMany(models.User, {
            as: 'likes',
            through: 'likes_albums',
            foreignKey: 'album_id',
            otherKey: 'user_id',

        });
        Album.hasMany(models.Post, {
            as: 'posts',
            foreignKey: 'id'
        });
    };

    return Album;
};
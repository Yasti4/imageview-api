'use strict';


module.exports = function(sequelize, DataTypes) {
    var Image = sequelize.define('Image', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        small: {
            type: DataTypes.STRING,
            allowNull: false
        },
        medium: {
            type: DataTypes.STRING,
            allowNull: false
        },
        large: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'images'
    });

    Image.associate = function(models) {
        Image.hasOne(models.Post, {
            as: 'post',
            foreignKey: 'id'
        });
        Image.hasOne(models.User, {
            as: 'user',
            foreignKey: 'id'
        });
    };

    return Image;
};
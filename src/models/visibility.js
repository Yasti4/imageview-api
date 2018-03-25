'use strict';

module.exports = function(sequelize, DataTypes) {
    var Visibility = sequelize.define('Visibility', {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
        }
    }, {
        tableName: 'visibilities'
    });

    Visibility.associate = function(models) {
        Visibility.hasMany(models.Post, {
            as: 'posts',
            foreignKey: 'id',
        });
        Visibility.hasMany(models.Album, {
            as: 'albums',
            foreignKey: 'id',
        });
    }

    return Visibility;
};
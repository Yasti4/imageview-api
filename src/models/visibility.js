'use strict';

module.exports = function (sequelize, DataTypes) {
  const Visibility = sequelize.define('Visibility', {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
    }
  }, {
    tableName: 'visibilities'
  });

  Visibility.associate = function (models) {
    Visibility.hasMany(models.Post, {
      as: 'posts',
      foreignKey: 'visibility',
    });
    Visibility.hasMany(models.Album, {
      as: 'albums',
      foreignKey: 'visibility',
    });
  }

  return Visibility;
};

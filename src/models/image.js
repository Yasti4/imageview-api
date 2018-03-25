'use strict';

module.exports = function (sequelize, DataTypes) {
  const Image = sequelize.define('Image', {
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

  Image.associate = function (models) {
    Image.hasOne(models.User, {
      as: 'user',
      foreignKey: 'image_id'
    });
    Image.hasOne(models.Post, {
      as: 'post',
      foreignKey: 'image_id'
    });
  };

  return Image;
};

'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Image', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    file_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'images'
  });

  Model.associate = function (models) {
    Model.belongsTo(models.File, {
      as: 'file',
      foreignKey: 'file_id'
    });
  };

  return Model;
};

'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('File', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false
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
    }
  }, {
    tableName: 'files',
    timestamps: true,
    paranoid: true
  });

  Model.associate = function (models) {
    Model.hasMany(models.Image, {
      as: 'images',
      foreignKey: 'file_id'
    });
    Model.hasOne(models.User, {
      as: 'user',
      foreignKey: 'file_id'
    });
    Model.hasOne(models.Post, {
      as: 'post',
      foreignKey: 'file_id'
    });
  };

  return Model;
};

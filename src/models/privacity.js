'use strict';

module.exports = function (sequelize, DataTypes) {
  const Privacity = sequelize.define('Privacity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    search: {
      type: DataTypes.STRING
    },
    posts: {
      type: DataTypes.STRING
    },
    albums: {
      type: DataTypes.STRING
    },
  }, {
    tableName: 'privacity'
  });

  Privacity.associate = function (models) {
    Privacity.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
      sourceKey: 'id'
    });
  };
  return Privacity;
};

'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('SubscriptionUser', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_followed: {
      type: DataTypes.INTEGER
    },
    user_follower: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'subscriptions_users'
  });

  Model.associate = function (models) {
    Model.belongsTo(models.User, {
      as: 'followed',
      foreignKey: 'user_followed',
      sourceKey: 'id'
    });
    Model.belongsTo(models.User, {
      as: 'follower',
      foreignKey: 'user_follower',
      sourceKey: 'id'
    });
  };
  return Model;
};

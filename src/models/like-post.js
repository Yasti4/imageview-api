'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('LikePost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    post_id: {
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'likes_posts'
  });

  Model.associate = function (models) {
    Model.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
      sourceKey: 'id'
    });
    Model.belongsTo(models.Post, {
      as: 'post',
      foreignKey: 'post_id',
      sourceKey: 'id'
    });
  };
  return Model;
};

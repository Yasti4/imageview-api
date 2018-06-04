'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('LikeComment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    comment_id: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'likes_comments'
  });

  Model.associate = function (models) {
    Model.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
      sourceKey: 'id'
    });
    Model.belongsTo(models.Comment, {
      as: 'comment',
      foreignKey: 'comment_id',
      sourceKey: 'id'
    });
  };
  return Model;
};

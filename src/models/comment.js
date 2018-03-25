'use strict';

module.exports = function (sequelize, DataTypes) {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING,
    },
    post_id: {
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER
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
    },
  }, {
    tableName: 'comments',
    timestamps: true,
    paranoid: true
  });

  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
      sourceKey: 'id'
    });
    Comment.belongsTo(models.Post, {
      as: 'post',
      foreignKey: 'post_id',
      sourceKey: 'id'
    });
    Comment.belongsToMany(models.User, {
      as: 'likes',
      through: 'likes_comments',
      foreignKey: 'comment_id'
    });
  }
  return Comment;
};

'use strict';

module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    image_id: {
      type: DataTypes.INTEGER,
    },
    visibility: {
      type: DataTypes.STRING,
    },
    enableComments: {
      type: DataTypes.BOOLEAN,
      field: 'enable_comments',
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
    tableName: 'posts',
    timestamps: true,
    paranoid: true
  });

  Post.associate = function (models) {
    Post.belongsTo(models.Image, {
      as: 'image',
      foreignKey: 'image_id',
      sourceKey: 'id'
    });
    Post.belongsToMany(models.Tag, {
      as: 'tags',
      through: 'posts_tags',
      foreignKey: 'post_id'
    });
    Post.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
      sourceKey: 'id'
    });
    Post.belongsTo(models.Album, {
      as: 'album',
      foreignKey: 'album_id',
      sourceKey: 'id'
    });
    Post.hasMany(models.Comment, {
      as: 'comments',
      foreignKey: 'post_id'
    });
    Post.belongsToMany(models.User, {
      as: 'likes',
      through: 'likes_posts',
      foreignKey: 'post_id'
    });
  };

  return Post;
};

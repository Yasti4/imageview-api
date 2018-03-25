'use strict';

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_id: {
      type: DataTypes.INTEGER,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: 'users',
    timestamps: true,
    paranoid: true
  });

  User.associate = function (models) {
    User.belongsTo(models.Role, {
      foreignKey: 'name',
      sourceKey: 'role'
    });
    User.belongsTo(models.Image, {
      as: 'image',
      foreignKey: 'id',
      sourceKey: 'image_id'
    });
    User.hasMany(models.Album, {
      as: 'albums',
      foreignKey: 'user_id'
    });
    User.belongsToMany(models.Album, {
      as: 'albumsSubscriptions',
      through: 'subscriptions_albums',
      foreignKey: 'user_id',
      otherKey: 'album_id',
    });
    User.belongsToMany(models.Album, {
      as: 'albumsLikes',
      through: 'likes_albums',
      foreignKey: 'user_id',
      otherKey: 'album_id',
    });
    User.hasMany(models.Post, {
      as: 'posts',
      foreignKey: 'user_id'
    });
    User.belongsToMany(models.Post, {
      as: 'postLikes',
      through: 'likes_posts',
      foreignKey: 'user_id',
      otherKey: 'post_id',
    });
    User.hasMany(models.Comment, {
      as: 'comments',
      foreignKey: 'user_id'
    });
    User.belongsToMany(models.Comment, {
      as: 'commentsLikes',
      through: 'likes_comments',
      foreignKey: 'user_id',
      otherKey: 'comment_id',
    });
    User.belongsToMany(models.User, {
      as: 'following',
      through: 'subscriptions_users',
      foreignKey: 'user_follower',
      otherKey: 'user_followed',
    });
    User.belongsToMany(models.User, {
      as: 'followed',
      through: 'subscriptions_users',
      foreignKey: 'user_followed',
      otherKey: 'user_follower',
    });
  }
  return User;
};

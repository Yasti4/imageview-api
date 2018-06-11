'use strict';

module.exports = function (sequelize, DataTypes) {
  const Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    tableName: 'tags'
  });

  Tag.associate = function (models) {
    Tag.Posts = Tag.belongsToMany(models.Post, {
      as: 'posts',
      through: 'posts_tags',
      foreignKey: 'tag_id',
      otherkey: 'post_id'
    });
  };

  return Tag;
};

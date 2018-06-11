'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('PostTag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tag_id: {
      type: DataTypes.INTEGER
    },
    post_id: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'posts_tags'
  });

  Model.associate = function (models) {
    Model.belongsTo(models.Tag, {
      as: 'tag',
      foreignKey: 'tag_id',
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

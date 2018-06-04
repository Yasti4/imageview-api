'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('LikeAlbum', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    album_id: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'likes_albums'
  });

  Model.associate = function (models) {
    Model.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
      sourceKey: 'id'
    });
    Model.belongsTo(models.Album, {
      as: 'album',
      foreignKey: 'album_id',
      sourceKey: 'id'
    });
  };
  return Model;
};

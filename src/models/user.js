'use strict';

const { Sequelize, sequelize } = require('./../config/sequelize')

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Image,
            key: 'id',
        }
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: Role,
            key: 'id',
        }
    },
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    // And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
    deletedAt: true,
    paranoid: true
});
return User;

module.exports = User;

// const Bookshelf = require('./../config/bookshelf');
// require('./role');
// require('./image');
// require('./user');
// require('./album');
// require('./post');
// require('./comment');

// module.exports = Bookshelf.model('User', {
//     tableName: 'users',
//     idAttribute: 'id',
//     hasTimestamps: ['created_at', 'updated_at'],
//     hidden: [
//         'deleted_at',
//     ],
//     softDelete: true,
//     image: function() {
//         return this.belongsTo('Image', 'id');
//     },
//     albums: function() {
//         return this.hasMany('Album', 'user_id');
//     },
//     albumsSubscriptions: function() {
//         return this.belongsToMany('Album', 'subscriptions_albums', 'user_id', 'album_id');
//     },
//     albumsLikes: function() {
//         return this.belongsToMany('Album', 'likes_albums', 'user_id', 'album_id');
//     },
//     posts: function() {
//         return this.hasMany('Post', 'user_id');
//     },
//     postsSubscriptions: function() {
//         return this.belongsToMany('Post', 'subscriptions_posts', 'user_id', 'post_id');
//     },
//     postLikes: function() {
//         return this.belongsToMany('Post', 'likes_post', 'user_id', 'post_id');
//     },
//     comments: function() {
//         return this.hasMany('Comment', 'user_id');
//     },
//     commentsLikes: function() {
//         return this.belongsToMany('Comment', 'likes_comments', 'user_id', 'comment_id');
//     },
//     following: function() { //siguiendo
//         return this.hasMany('User', 'user_follower');
//     },
//     followed: function() { //seguido
//         return this.hasMany('User', 'user_followed');
//     }
// });
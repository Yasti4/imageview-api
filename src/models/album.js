'use strict';

const Bookshelf = require('./../config/bookshelf');
require('./visibility');
require('./user');
require('./post');

module.exports = Bookshelf.model('Album', {
	tableName: 'albums',
	idAttribute: 'id',
	hasTimestamps: ['created_at', 'updated_at'],
	hidden: [
		'deleted_at',
	],
	softDelete: true,
	subscriptions: function () {
		return this.belongsToMany('User', 'subscriptions_albums', 'user_id', 'album_id');
	},
	likes: function () {
		return this.belongsToMany('User', 'likes_albums', 'user_id', 'album_id');
	},
	posts: function () {
		return this.hasMany('Post', 'id');
	},
});
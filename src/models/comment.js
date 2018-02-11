'use strict';

const Bookshelf = require('./../config/bookshelf');
require('./user');
require('./post');

module.exports = Bookshelf.model('Comment', {
	tableName: 'comments',
	idAttribute: 'id',
	hasTimestamps: ['created_at', 'updated_at'],
	hidden: [
		'deleted_at',
	],
	softDelete: true,
	user: function () {
		return this.belongsTo('User', 'id');
	},
	post: function () {
		return this.belongsTo('Post', 'id');
	},
	likes: function () {
		return this.belongsToMany('User', 'likes_comments', 'user_id', 'comment_id');
	}
});
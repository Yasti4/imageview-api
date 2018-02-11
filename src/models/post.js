'use strict';

const Bookshelf = require('./../config/bookshelf');
require('./tag');
require('./image');
require('./user');
require('./comment');

module.exports = Bookshelf.model('Post', {
	tableName: 'posts',
	idAttribute: 'id',
	hasTimestamps: ['created_at', 'updated_at'],
	hidden: [
		'deleted_at',
	],
	softDelete: true,
	parse: function(post) {
    if (post.enable_comments != null) post.enable_comments = !!+post.enable_comments;
    return post;
  },
	image: function () {
		return this.belongsTo('Image', 'id');
	},
	tags: function () {
		return this.belongsToMany('Tag', 'posts_tags', 'tag_id', 'post_id');
	},
	user: function () {
		return this.belongsTo('User', 'id');
	},
	comments: function () {
		return this.hasMany('Comment', 'post_id');
	},
	subscriptions: function () {
		return this.belongsToMany('User', 'subscriptions_posts', 'user_id', 'post_id');
	},
	likes: function () {
		return this.belongsToMany('User', 'likes_posts', 'user_id', 'post_id');
	},
});
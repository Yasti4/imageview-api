'use strict';

const Bookshelf = require('./../config/bookshelf');
require('./post');

module.exports = Bookshelf.model('Tag', {
	tableName: 'tags',
	idAttribute: 'id',
	posts: function () {
		return this.belongsToMany('Post', 'posts_tags', 'post_id', 'tag_id');
	},
});
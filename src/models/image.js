'use strict';

const Bookshelf = require('./../config/bookshelf');
require('./post');
require('./user');

module.exports = Bookshelf.model('Image', {
	tableName: 'images',
	idAttribute: 'id',
	posts: function () {
		return this.belongsToMany('Post', 'posts', 'image', 'id');
	},
	user: function () {
		return this.belongsToMany('User', 'users', 'image', 'id');
	}
});
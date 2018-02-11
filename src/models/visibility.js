'use strict';

const Bookshelf = require('./../config/bookshelf');
require('./album');
require('./post');

module.exports = Bookshelf.model('Visibility', {
	tableName: 'visibilities',
	idAttribute: 'name',
	albums: function () {
		return this.hasMany('Album', 'visibility');
	},
	posts: function () {
		return this.hasMany('Post', 'visibility');
	},
});
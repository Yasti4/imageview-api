import Bookshelf from './../config/bookshelf';
import Post from './post';
import User from './user';

export default Bookshelf.Model.extend({
	tableName: 'images',
	idAttribute: 'id',
	post: function () {
		return this.belongsToMany(Post, 'id');
	},
	user: function () {
		return this.belongsTo(User, 'id');
	},
	users: function () {
		return this.belongsToMany(User, 'id');
	}
	
});
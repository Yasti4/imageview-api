import Model from './model';
import Post from './post';
import User from './user';

export default Model({
	tableName: 'images',
	idAttribute: 'id',
	posts: function () {
		return this.belongsToMany(Post, 'posts', 'image', 'id');
	},
	user: function () {
		return this.belongsToMany(User, 'users', 'image', 'id');
	}
});
import Bookshelf from './../config/bookshelf';
import Post from './post';

export default Bookshelf.Model.extend({
	tableName: 'tags',
	idAttribute: 'id',
	post: function () {
		return this.belongsToMany(Post, 'id');
	}
});

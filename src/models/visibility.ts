import Model from './model';
import Album from './album';
import Post from './album';

export default Model({
	tableName: 'visibilities',
	idAttribute: 'name',
	albums: function () {
		return this.hasMany(Album, 'visibility');
	},
	posts: function () {
		return this.hasMany(Post, 'visibility');
	}, 
});

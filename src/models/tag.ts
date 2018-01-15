import Model from './model';
import Post from './post';

export default Model({
	tableName: 'tags',
	idAttribute: 'id',
	posts: function () {
		return this.belongsToMany(Post, 'posts_tags', 'post_id', 'tag_id');
	},
});

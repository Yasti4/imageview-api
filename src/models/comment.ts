import User from './user';
import Post from './post';
import Model from './model';

export default Model({
	tableName: 'comments',
	idAttribute: 'id',
	hasTimestamps: ['created_at', 'updated_at'],
	hidden: [
    'deleted_at',
	],
	softDelete: true,
	user: function () {
		return this.belongsTo(User, 'id');
	},
	post: function () {
		return this.belongsTo(Post, 'id');
	},
	likes: function () {
		return this.belongsToMany(User, 'likes_comments', 'user_id', 'comment_id');
	}
	
});

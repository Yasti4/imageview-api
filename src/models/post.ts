import Tag from './tag';
import Image from './image';
import Model from './model';
import User from './user';
import Comment from './comment'

export default Model({
	tableName: 'posts',
	idAttribute: 'id',
	hasTimestamps: ['created_at', 'updated_at'],
	hidden: [
		'deleted_at',
	],
	softDelete: true,
	image: function () {
		return this.belongsTo(Image, 'id');
	},
	tags: function () {
		return this.belongsToMany(Tag, 'posts_tags', 'tag_id', 'post_id'); //TODO
	},
	user: function () {
		return this.belongsTo(User, 'id');
	},
	comments: function () {
		return this.hasMany(Comment, 'post_id');
	},
	subscriptions: function () {
		return this.belongsToMany(User, 'subscriptions_posts', 'user_id', 'post_id');
	},
	likes: function () {
		return this.belongsToMany(User, 'likes_posts', 'user_id', 'post_id');
	},
});
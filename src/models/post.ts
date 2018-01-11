import Bookshelf from './../config/bookshelf';
import Tag from './tag';
import Image from './image';
import User from './user';

export default Bookshelf.Model.extend({
	tableName: 'posts',
	idAttribute: 'id',
	hasTimestamps: ['created_at', 'updated_at'],
	hidden: [
    'deletedAt',
	],
	softDelete: true,
	image: function () {
		return this.belongsTo(Image, 'id');
	},
	tags: function () {
		return this.belongsToMany(Tag, 'id');
	},
	user: function () {
		return this.belongsToMany(User, 'id');
	},
});
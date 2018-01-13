// import Bookshelf from './../config/bookshelf';
import Role from './role';
import Image from './image';
import User from './user';
import Model from './model';

export default Model({
	tableName: 'users',
	idAttribute: 'id',
	hasTimestamps: ['created_at', 'updated_at'],
	hidden: [
		'deleted_at',
	],
	softDelete: true,
	image: function () {
		return this.belongsTo(Image, 'id');
	}
});

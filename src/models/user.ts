import Bookshelf from './../config/bookshelf';
import Role from './role';
import Image from './image';
import User from './user';

export default Bookshelf.Model.extend({
	tableName: 'users',
	idAttribute: 'id',
	hasTimestamps: ['created_at', 'updated_at'],
	hidden: [
    'deletedAt',
	],
	softDelete: true,
	image: function () {
		return this.belongsTo(Image, 'id');
	}
});

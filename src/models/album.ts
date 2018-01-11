import Bookshelf from './../config/bookshelf';
import Visibility from './visibility';
import User from './user';

export default Bookshelf.Model.extend({
	tableName: 'albums',
	idAttribute: 'id',
	hasTimestamps: ['created_at', 'updated_at'],
	hidden: [
    'deletedAt',
	],
	softDelete: true,
	visibility: function () {
		return this.belongsTo(Visibility, 'name');
	},
	subscriptions: function () {
		return this.belongsToMany(User, 'id');
	}
	
});

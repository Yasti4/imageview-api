// import Bookshelf from './../config/bookshelf';
import Visibility from './visibility';
import User from './user';
import Model from './model';

export default Model({
	tableName: 'albums',
	idAttribute: 'id',
	hasTimestamps: ['created_at', 'updated_at'],
	hidden: [
		'deleted_at',
	],
	softDelete: true,
	visibility: function () {
		return this.belongsTo(Visibility, 'name');
	},
	subscriptions: function () {
		return this.belongsToMany(User, 'id');
	}
});

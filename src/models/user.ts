import Bookshelf from './../config/bookshelf';
import Role from './role';

export default Bookshelf.Model.extend({
	tableName: 'users',
	idAttribute: 'id',
	hasTimestamps: ['created_at', 'updated_at'],
	role: function () {
		return this.belongsTo(Role, 'name');
	}
});

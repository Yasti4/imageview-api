import Bookshelf from './../config/bookshelf';
import User from './user';

export default Bookshelf.Model.extend({
	tableName: 'roles',
	idAttribute: 'name',
	users: function () {
		return this.hasMany(User, 'role');
	}
});

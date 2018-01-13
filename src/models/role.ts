// import Bookshelf from './../config/bookshelf';
import User from './user';
import Model from './model';

export default Model({
	tableName: 'roles',
	idAttribute: 'name',
	users: function () {
		return this.hasMany(User, 'role');
	}
});

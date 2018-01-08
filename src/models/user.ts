import Bookshelf from './../config/bookshelf';
import Role from './role';

export default class User extends Bookshelf.Model<User> {
	get tableName() { return 'users'; }
	get hasTimestamps() { return true; }
	get idAttribute() { return 'id' }
	

	role = function() {
		return this.belongsTo(Role, 'name');
	}

}

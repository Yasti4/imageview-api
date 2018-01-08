import Bookshelf from './../config/bookshelf';
import User from './user';

export default class Role extends Bookshelf.Model<any> {
	get tableName() { return 'roles'; }
	get hasTimestamps() { return false; }
	get idAttribute() { return 'name' }

	users = function() {
		return this.hasMany(User, 'id');
	}

}

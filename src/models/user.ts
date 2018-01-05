import Bookshelf from './../config/bookshelf';

export default class User extends Bookshelf.Model<any> {
	get tableName() { return 'users'; }
	get hasTimestamps() { return true; }
	get defaults() {
		return {
			property1: 'name',
		}
	}

}

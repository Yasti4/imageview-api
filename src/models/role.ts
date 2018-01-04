import Bookshelf from './../config/bookshelf';

export default class Role extends Bookshelf.Model<any> {
	get tableName() { return 'roles'; }
	get hasTimestamps() { return false; }
	get defaults() {
		return {
			property1: 'name',
		}
	}

}

import Bookshelf from './../config/bookshelf';

export default class Visibility extends Bookshelf.Model<any> {
	get tableName() { return 'visibilities'; }
	get hasTimestamps() { return false; }
	get defaults() {
		return {
			property1: 'name',
		}
	}

}

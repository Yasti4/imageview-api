import Bookshelf from './../config/bookshelf';

export default class Tag extends Bookshelf.Model<any> {
	get tableName() { return 'tags'; }
	get hasTimestamps() { return false; }
	get defaults() {
		return {
			property1: 'name',
		}
	}

}

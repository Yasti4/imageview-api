import Bookshelf from './../config/bookshelf';

export default class Image extends Bookshelf.Model<any> {
	get tableName() { return 'images'; }
	get hasTimestamps() { return false; }
	get defaults() {
		return {
			property1: 'name',
		}
	}

}

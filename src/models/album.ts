import Bookshelf from './../config/bookshelf';

export default class Album extends Bookshelf.Model<any> {
	get tableName() { return 'albums'; }
	get hasTimestamps() { return true; }
	get defaults() {
		return {
			property1: 'name',
		}
	}

}

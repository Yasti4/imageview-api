import Bookshelf from './../config/bookshelf';

export default class Post extends Bookshelf.Model<any> {
	get tableName() { return 'posts'; }
	get hasTimestamps() { return true; }
	get defaults() {
		return {
			property1: 'name',
		}
	}

}

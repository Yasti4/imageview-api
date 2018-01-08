import Bookshelf from './../config/bookshelf';

export default class Comment extends Bookshelf.Model<any> {
	get tableName() { return 'comments'; }
	get hasTimestamps() { return true; }
	get defaults() {
		return {
			property1: 'name',
		}
	}

	// post = function() {
  //   return this.hasOne(Post, 'post_id');
  // }

}

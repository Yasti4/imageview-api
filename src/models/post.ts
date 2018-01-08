import Bookshelf from './../config/bookshelf';
import Tag from './tag';

export default class Post extends Bookshelf.Model<any> {
	get tableName() { return 'posts'; }
	get hasTimestamps() { return true; }
	get defaults() {
		return {
			property1: 'name',
		}
	}

	tags = function() {
		return this.belongsTo(Tag, 'id');
	}
	// return this.hasOne('Post', 'postId');
	
	// Post.forge().fetch({withRelated: ['tags']}).then(function(x){console.log(x)})

}

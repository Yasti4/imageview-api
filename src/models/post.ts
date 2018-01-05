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

	tags = () => {
    return this.belongsToMany(Tag);
  }

}

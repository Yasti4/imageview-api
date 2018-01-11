import Bookshelf from './../config/bookshelf';

export default Bookshelf.Model.extend({
	tableName: 'visibilities',
	idAttribute: 'name',	
});

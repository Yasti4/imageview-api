import Bookshelf from './../config/bookshelf';

export default (data: {
	tableName: string;
	idAttribute?: string;
	hasTimestamps?: string[];
	hidden?: string[];
	softDelete?: boolean;
} | Object) => {
	return Bookshelf.Model.extend(data);
};

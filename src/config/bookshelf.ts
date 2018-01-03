const knex = require('knex')(require('./knexfile').development);
const Bookshelf = require('bookshelf')(knex);
Bookshelf.plugin(require('bookshelf-eloquent'));
Bookshelf.plugin('registry');
Bookshelf.plugin('visibility');

export default Bookshelf;
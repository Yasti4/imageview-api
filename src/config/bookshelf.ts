const Bookshelf = require('bookshelf')(require('knex')(require('./knexfile')));
Bookshelf.plugin(require('bookshelf-eloquent'));
Bookshelf.plugin('registry');
Bookshelf.plugin('visibility');

export default Bookshelf;
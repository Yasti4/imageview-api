const connection = require('./knexfile').development;
const Knex = require('knex')(connection);
const Bookshelf = require('bookshelf')(Knex);

// Bookshelf supported plugins.
Bookshelf.plugin('registry');
Bookshelf.plugin('visibility');

// Community plugins.
Bookshelf.plugin(require('bookshelf-paranoia'), { field: 'deleted_at' });
Bookshelf.plugin(require('bookshelf-scopes'));
Bookshelf.plugin(require('bookshelf-eloquent'));

export default Bookshelf;
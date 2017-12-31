const knexfile = require('../../knexfile');
var knex = require('knex')(knexfile['dev']);

const Bookshelf = require('bookshelf')(knex);

bookshelf.plugin(require('bookshelf-eloquent'));
Bookshelf.plugin('registry'); // Resolve circular dependencies with relations
Bookshelf.plugin('visibility');
module.exports = Bookshelf;
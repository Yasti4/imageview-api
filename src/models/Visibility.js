// info: http://stackabuse.com/bookshelf-js-a-node-js-orm/
// const bookshelf = require('../config/database');


const Bookshelf = require('../config/database');

exports.model = Bookshelf.Model.extend({
    tableName: "visibilities",
});
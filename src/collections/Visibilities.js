const Bookshelf = require('../config/database');

var Visibility = require('../models/Visibility');

module.exports = Bookshelf.Collection.extend({
    model: Visibility
});
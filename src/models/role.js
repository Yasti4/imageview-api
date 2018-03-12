'use strict';

const Bookshelf = require('./../config/bookshelf');
require('./user');

module.exports = Bookshelf.model('Role', {
    tableName: 'roles',
    idAttribute: 'name',
    users: function() {
        return this.hasMany('User', 'role');
    }
});
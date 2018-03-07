'use strict';

const Bookshelf = require('./../config/bookshelf');
const {
    Visibility
} = require('./../models');

module.exports = Bookshelf.model('Privacity', {
    tableName: 'privacity',
    idAttribute: 'id'
});
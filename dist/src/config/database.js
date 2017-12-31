"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knexfile = require('../../knexfile');
var knex = require('knex')(knexfile['dev']);
const Bookshelf = require('bookshelf')(knex);
Bookshelf.plugin(require('bookshelf-eloquent'));
Bookshelf.plugin('registry');
Bookshelf.plugin('visibility');
exports.default = Bookshelf;

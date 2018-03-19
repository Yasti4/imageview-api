'use strict';
require('dotenv').load();

var fs = require('fs');

var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);

var sequelize = new Sequelize(
    process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_CONNECTION,
        pool: {
            min: 2,
            max: 10,
        },
        omitNull: true,
        define: {
            charset: process.env.DB_CHARSET,
            dialectOptions: {
                collate: 'utf8_general_ci',
                timezone: process.env.DB_TIMEZONE
            },
            timestamps: false
        }
    }
)

module.exports = { sequelize, Sequelize };
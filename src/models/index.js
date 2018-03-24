'use strict';

const Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
var basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
    process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_CONNECTION,
        operatorsAliases: false,
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
);


fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});




db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
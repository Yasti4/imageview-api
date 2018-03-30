'use strict';

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_CONNECTION,
        logging: () => {},
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

const db = {
    sequelize,
    Sequelize
};

const graphqlFields = require('graphql-fields');
// Load models
const path = require('path');
const basename = path.basename(__filename);
require('fs')
    .readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
        // Custom
        db[model.name].fields = Object.keys(model.attributes);
        db[model.name].onlyAttributes = (info) => {
            const topLevelFields = Object.keys(graphqlFields(info));
            return db[model.name].fields.filter(field => topLevelFields.indexOf(field) > -1);
        };
    });
// Load associations
Object.keys(db)
    .filter(modelName => db[modelName].associate)
    .forEach(modelName => {
        db[modelName].associate(db);
        // Custom
        db[modelName].relations = Object.keys(db[modelName].associations);
    });

module.exports = db;
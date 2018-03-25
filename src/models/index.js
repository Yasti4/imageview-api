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

// Load models
const path = require('path');
const basename = path.basename(__filename);
require('fs')
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });
// Load associations
Object.keys(db).filter(modelName => db[modelName].associate).forEach(modelName => db[modelName].associate(db));

module.exports = db;

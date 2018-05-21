'use strict'

const Sequelize = require('sequelize')
const graphqlFields = require('graphql-fields')

exports.createDatabase = function (models = []) {
  const db = {
    Sequelize
  }

  // Load Sequelize
  db.sequelize = new Sequelize(
    process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      dialect: process.env.DB_CONNECTION,
      logging: () => {},
      operatorsAliases: false,
      pool: {
        min: 2,
        max: 10
      },
      omitNull: true,
      define: {
        charset: process.env.DB_CHARSET,
        dialectOptions: {
          collate: process.env.DB_COLLATION,
          timezone: process.env.DB_TIMEZONE
        },
        timestamps: false
      }
    }
  )

  // Load Models
  models.forEach(modelFn => {
    const model = modelFn(db.sequelize, Sequelize.DataTypes)
    db[model.name] = model
    db[model.name].fields = Object.keys(model.attributes)
    db[model.name].onlyAttributes = (info) => {
      const topLevelFields = Object.keys(graphqlFields(info))
      return db[model.name].fields.filter(field => topLevelFields.indexOf(field) > -1)
    }
  })

  // Load Associations
  Object.keys(db)
    .filter(modelName => db[modelName].associate)
    .forEach(modelName => {
      db[modelName].associate(db)
      db[modelName].relations = Object.keys(db[modelName].associations)
    })

  return db
}

exports.softDelete = (softDelete) => !(softDelete === undefined ? true : softDelete)

exports.pagination = (page = 1, limit = 10) => ({
  offset: (page - 1) * limit,
  limit: limit
})

exports.orderBy = (field = 'updatedAt', order = 'DESC') => ({
  order: [ [ field, order ] ]
})

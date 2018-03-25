'use strict';

const {
  makeExecutableSchema
} = require('graphql-tools');

const schema = makeExecutableSchema({
  typeDefs: `
    ${require('./types')}
    ${require('./queries')}
  `,
  resolvers: {
    Query: {
      roles: (parent, args, context, info) => {
        return context.db.Role.findAll();
      }
    }
  }
});

module.exports = schema;

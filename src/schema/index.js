'use strict';

const {
    makeExecutableSchema
} = require('graphql-tools');

module.exports = makeExecutableSchema({
    typeDefs: `
    scalar Date
    ${require('./types')}
    ${require('./inputs')}
    ${require('./queries')}
    ${require('./mutations')}
  `,
    resolvers: {
        Query: require('./resolvers/queries'),
        Date: require('graphql-date'),
        ...require('./resolvers/fields'),
        Mutation: require('./resolvers/mutations'),
    }
});
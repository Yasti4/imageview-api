'use strict';

const {
  GraphQLSchema,
  GraphQLObjectType
} = require('graphql');
const UserQueries = require('./queries/user.queries');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: UserQueries.user,
      users: UserQueries.users
    }
  })
});
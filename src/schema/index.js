'use strict';

const {
  GraphQLSchema,
  GraphQLObjectType
} = require('graphql');
// const {
//   addDirectiveResolveFunctionsToSchema 
// } = require('graphql-directive');

const {
  AuthDirective
} = require('./directives');

const {
  UserQueries,
  AlbumQueries,
  VisibilityQueries,
  PrivacityQueries,
  TagQueries,
  CommentQueries,
  ImageQueries,
  PostQueries,
  RoleQueries
} = require('./queries');

const RoleMutation = require('./mutations/role.mutations');
const VisibilityMutation = require('./mutations/visibility.mutations');
const UserMutation = require('./mutations/user.mutations');

const schema = new GraphQLSchema({
  directives: [
    // AuthDirective
  ],
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      ...UserQueries,
      ...AlbumQueries,
      ...VisibilityQueries,
      ...PrivacityQueries,
      ...TagQueries,
      ...CommentQueries,
      ...ImageQueries,
      ...PostQueries,
      ...RoleQueries
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      ...RoleMutation,
      ...VisibilityMutation,
      ...UserMutation
    }
  })
});

// const directiveResolvers = {
//   isAuth(next, source, args, context, info) {
//     throw Error('Ups!');
//   }
// };

module.exports = schema;

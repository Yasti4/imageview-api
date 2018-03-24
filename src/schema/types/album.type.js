'use strict';

const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString
} = require('graphql');
const GraphQLDate = require('graphql-date');

module.exports = new GraphQLObjectType({
  name: 'Album',
  description: '...',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt)
    },
    title: {
      type: GraphQLNonNull(GraphQLString)
    },
    description: {
      type: GraphQLString
    },
    visibility: {
      type: GraphQLNonNull(GraphQLString)
    },
    createdAt: {
      type: GraphQLDate
    },
    updatedAt: {
      type: GraphQLDate
    },
    deletedAt: {
      type: GraphQLDate
    },
  })
});

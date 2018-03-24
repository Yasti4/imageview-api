'use strict';

const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString
} = require('graphql');
const GraphQLDate = require('graphql-date');
const resolver = require('../resolvers/image.resolvers');

module.exports = new GraphQLObjectType({
  name: 'Image',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt)
    },
    small: {
      type: GraphQLNonNull(GraphQLString)
    },
    medium: {
      type: GraphQLString
    },
    large: {
      type: GraphQLString
    },
    post: {
      type: require('../types/post.type'),
      resolve: (parent, args, context, info) => {
        return resolver.post(parent, {
          image_id: parent.id
        }, context, info);
      }
    }
  })
});

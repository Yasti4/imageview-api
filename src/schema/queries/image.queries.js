'use strict';

const type = require('./../types/image.type');
const resolver = require('./../resolvers/image.resolvers');
const {
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLInt
} = require('graphql');

module.exports = {
  image: {
    type: type,
    args: {
      id: {
        type: GraphQLInt
      },
    },
    resolve: resolver.image
  },
  images: {
    type: GraphQLNonNull(GraphQLList(type)),
    resolve: resolver.images
  }
};

'use strict';

const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString
} = require('graphql');
const GraphQLDate = require('graphql-date');
const resolver = require('../resolvers/post.resolvers');
const User = require('../types/user.type');
const Album = require('../types/album.type');
const Image = require('../types/image.type');

module.exports = new GraphQLObjectType({
  name: 'Post',
  description: '...',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt)
    },
    description: {
      type: GraphQLString
    },
    user: {
        type: GraphQLNonNull(User),
        resolve: (parent, args, context, info) => {
            return resolver.user(parent, {
                id: parent.user_id
            }, context, info);
        }
    },
    album: {
      type: Album,
      resolve: (parent, args, context, info) => {
        return resolver.album(parent, {
          id: parent.album_id
        }, context, info);
      }
    },
    image_id: {
      type: GraphQLNonNull(GraphQLInt)
    },
    enableComments: {
      type: GraphQLNonNull(GraphQLInt)
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
    image: {
      type: GraphQLNonNull(Image),
      resolve: (parent, args, context, info) => {
        return resolver.image(parent, {
          id: parent.image_id
        }, context, info);
      }
    },
  })
});

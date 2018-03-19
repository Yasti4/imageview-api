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

module.exports = new GraphQLObjectType({
    name: 'Post',
    description: '...',
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLInt)
        },
        descriptions: {
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
        image: {
            type: GraphQLNonNull(GraphQLInt)
        },
        image: {
            type: GraphQLNonNull(GraphQLString)
        },
        enable_comments: {
            type: GraphQLNonNull(GraphQLInt)
        },
        created_at: {
            type: GraphQLDate
        },
        updated_at: {
            type: GraphQLDate
        },
        deleted_at: {
            type: GraphQLDate
        },
    })
});
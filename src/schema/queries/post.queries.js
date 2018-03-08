'use strict';

const type = require('./../types/post.type');
const resolver = require('./../resolvers/post.resolvers');
const {
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} = require('graphql');

module.exports = {
    post: {
        type: type,
        args: {
            id: {
                type: GraphQLInt
            },
            user_id: {
                type: GraphQLInt
            },
            album_id: {
                type: GraphQLInt
            },
            enable_comments: {
                type: GraphQLInt
            },
        },
        resolve: resolver.post
    },
    posts: {
        type: GraphQLNonNull(GraphQLList(type)),
        resolve: resolver.posts
    }
};
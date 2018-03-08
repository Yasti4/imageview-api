'use strict';

const type = require('./../types/comment.type');
const resolver = require('./../resolvers/comment.resolvers');
const {
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} = require('graphql');

module.exports = {
    comment: {
        type: type,
        args: {
            id: {
                type: GraphQLInt
            },
            comment_id: {
                type: GraphQLInt
            },
            post_id: {
                type: GraphQLInt
            },
            user_id: {
                type: GraphQLInt
            }
        },
        resolve: resolver.comment
    },
    comments: {
        type: GraphQLNonNull(GraphQLList(type)),
        resolve: resolver.comments
    }
};
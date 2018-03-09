'use strict';

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString
} = require('graphql');
const GraphQLDate = require('graphql-date');
const resolver = require('../resolvers/comment.resolvers');
const User = require('./user.type');
const Post = require('./post.type');

module.exports = new GraphQLObjectType({
    name: 'Comment',
    description: '...',
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLInt)
        },
        content: {
            type: GraphQLNonNull(GraphQLString)
        },
        post: {
            type: GraphQLNonNull(Post),
            resolve: (parent, args, context, info) => {
                return resolver.post(parent, {
                    id: parent.post_id
                }, context, info);
            }
        },
        user: {
            type: GraphQLNonNull(User),
            resolve: (parent, args, context, info) => {
                return resolver.user(parent, {
                    id: parent.user_id
                }, context, info);
            }
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
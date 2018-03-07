'use strict';

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString
} = require('graphql');
const GraphQLDate = require('graphql-date');

module.exports = new GraphQLObjectType({
    name: 'Post',
    description: '...',
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLInt)
        },
        title: {
            type: GraphQLNonNull(GraphQLString)
        },
        descriptions: {
            type: GraphQLString
        },
        user_id: {
            type: GraphQLNonNull(GraphQLInt)
        },
        album_id: {
            type: GraphQLString
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
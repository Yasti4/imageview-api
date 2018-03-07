'use strict';

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString
} = require('graphql');
const GraphQLDate = require('graphql-date');

module.exports = new GraphQLObjectType({
    name: 'Privacity',
    description: '...',
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLInt)
        },
        user_id: {
            type: GraphQLNonNull(GraphQLInt)
        },
        search: {
            type: GraphQLNonNull(GraphQLString)
        },
        posts: {
            type: GraphQLNonNull(GraphQLString)
        },
        albums: {
            type: GraphQLNonNull(GraphQLString)
        },
    })
});
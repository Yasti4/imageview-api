'use strict';

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString
} = require('graphql');
const GraphQLDate = require('graphql-date');

module.exports = new GraphQLObjectType({
    name: 'Image',
    description: '...',
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLInt)
        },
        small: {
            type: GraphQLNonNull(GraphQLString)
        },
        medium: {
            type: GraphQLNonNull(GraphQLString)
        },
        large: {
            type: GraphQLString
        },
        huge: {
            type: GraphQLString
        },
    })
});
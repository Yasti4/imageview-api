'use strict';

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString
} = require('graphql');
const GraphQLDate = require('graphql-date');

module.exports = new GraphQLObjectType({
    name: 'Role',
    description: '...',
    fields: () => ({
        name: {
            type: GraphQLNonNull(GraphQLInt)
        }
    })
});
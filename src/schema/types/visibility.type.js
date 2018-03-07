'use strict';

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString
} = require('graphql');
const GraphQLDate = require('graphql-date');

module.exports = new GraphQLObjectType({
    name: 'Visibility',
    description: '...',
    fields: () => ({
        name: {
            type: GraphQLNonNull(GraphQLString)
        },
    })
});
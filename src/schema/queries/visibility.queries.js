'use strict';

const type = require('./../types/visibility.type');
const resolver = require('./../resolvers/visibility.resolvers');
const {
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} = require('graphql');

module.exports = {
    visibility: {
        type: type,
        args: {
            name: {
                type: GraphQLString
            }
        },
        resolve: resolver.visibility
    },
    visibilities: {
        type: GraphQLNonNull(GraphQLList(type)),
        resolve: resolver.visibilities
    }
};
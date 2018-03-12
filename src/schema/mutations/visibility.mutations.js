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
    createVisibility: {
        type: type,
        args: {
            name: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: resolver.createVisibility,
    },
    deleteVisibility: {
        type: type,
        args: {
            name: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: resolver.deleteVisibility,
    }
};
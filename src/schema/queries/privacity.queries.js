'use strict';

const type = require('./../types/privacity.type');
const resolver = require('./../resolvers/privacity.resolvers');
const {
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} = require('graphql');

module.exports = {
    privacity: {
        type: type,
        args: {
            id: {
                type: GraphQLInt
            },
            user_id: {
                type: GraphQLInt
            }
        },
        resolve: resolver.privacity
    },
    privacities: {
        type: GraphQLNonNull(GraphQLList(type)),
        resolve: resolver.privacities
    }
};
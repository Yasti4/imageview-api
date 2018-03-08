'use strict';

const type = require('./../types/role.type');
const resolver = require('./../resolvers/role.resolvers');
const {
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} = require('graphql');

module.exports = {
    role: {
        type: type,
        args: {
            name: {
                type: GraphQLString
            },
        },
        resolve: resolver.role
    },
    roles: {
        type: GraphQLNonNull(GraphQLList(type)),
        resolve: resolver.roles
    }
};
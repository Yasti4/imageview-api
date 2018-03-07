'use strict';

const type = require('./../types/user.type');
const resolver = require('./../resolvers/user.resolvers');
const {
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} = require('graphql');

module.exports = {
    user: {
        type: type,
        args: {
            id: {
                type: GraphQLInt
            },
            username: {
                type: GraphQLString
            }
        },
        resolve: resolver.user
    },
    users: {
        type: GraphQLNonNull(GraphQLList(type)),
        resolve: resolver.users
    }
};
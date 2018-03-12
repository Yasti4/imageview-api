'use strict';

const type = require('./../types/user.type');
const resolver = require('./../resolvers/user.resolvers');
const {
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} = require('graphql');
const {
    UserInput
} = require('./../inputs');

module.exports = {
    updateUser: {
        type: type,
        args: {
            username: {
                type: new GraphQLNonNull(GraphQLString)
            },
            input: {
                type: new GraphQLNonNull(UserInput)
            }
        },
        resolve: resolver.updateUser,
    }
};
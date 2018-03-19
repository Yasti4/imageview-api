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
    UserInputInsert,
    UserInputUpdate
} = require('./../inputs');

module.exports = {
    createUser: {
        type: type,
        args: {
            input: {
                type: UserInputInsert
            }
        },
        resolve: resolver.createUser,
    },
    updateUser: {
        type: type,
        args: {
            username: {
                type: new GraphQLNonNull(GraphQLString)
            },
            input: {
                type: new GraphQLNonNull(UserInputUpdate)
            }
        },
        resolve: resolver.updateUser,
    }
};
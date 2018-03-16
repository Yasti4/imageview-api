'use strict';

const type = require('./../types/privacity.type');
const resolver = require('./../resolvers/privacity.resolvers');
const {
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} = require('graphql');

const {
    PrivacityInputInsert,
    PrivacityInputUpdate
} = require('./../inputs');

module.exports = {
    createPrivacity: {
        type: type,
        args: {
            input: {
                type: new GraphQLNonNull(PrivacityInputInsert)
            }
        },
        resolve: resolver.createPrivacity,
    },
    updatePrivacity: {
        type: type,
        args: {
            input: {
                type: new GraphQLNonNull(PrivacityInputUpdate)
            }
        },
        resolve: resolver.updatePrivacity,
    }
};
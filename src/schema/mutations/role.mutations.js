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
    createRole: {
        type: type,
        args: {
            name: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: resolver.createRole,
    },
    updateRole: {
        type: type,
        args: {
            oldName: {
                type: new GraphQLNonNull(GraphQLString)
            },
            newName: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: resolver.updateRole,
    }
};
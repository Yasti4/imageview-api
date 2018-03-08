'use strict';

const type = require('./../types/tag.type');
const resolver = require('./../resolvers/tag.resolvers');
const {
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} = require('graphql');

module.exports = {
    tag: {
        type: type,
        args: {
            id: {
                type: GraphQLInt
            },
            name: {
                type: GraphQLString
            }
        },
        resolve: resolver.tag
    },
    tags: {
        type: GraphQLNonNull(GraphQLList(type)),
        resolve: resolver.tags
    }
};
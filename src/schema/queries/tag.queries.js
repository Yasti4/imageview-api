'use strict';

const typeTag = require('./../types/tag.type');
const typeUser = require('./../types/user.type');
const resolver = require('./../resolvers/tag.resolvers');
const {
    User,
    Tag
} = require('./../../models');
const {
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLUnionType
} = require('graphql');

module.exports = {
    tag: {
        type: typeTag,
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
        type: GraphQLNonNull(GraphQLList(typeTag)),
        resolve: resolver.tags
    },
    search: { //Ver donde va la consulta
        args: {
            search: {
                type: GraphQLNonNull(GraphQLString)
            },
        },
        type: GraphQLList(new GraphQLUnionType({
            name: "Search",
            types: () => [typeUser, typeTag],
            resolveType(value) {
                if (value.username) {
                    return typeUser;
                }
                if (value.name) {
                    return typeTag;
                }
            }
        })),
        resolve: resolver.search
    }
};
'use strict';

const type = require('./../types/album.type');
const resolver = require('./../resolvers/album.resolvers');
const {
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} = require('graphql');

module.exports = {
    album: {
        type: type,
        args: {
            id: {
                type: GraphQLInt
            }
        },
        resolve: resolver.album
    },
    albums: {
        type: GraphQLNonNull(GraphQLList(type)),
        resolve: resolver.albums
    }
};
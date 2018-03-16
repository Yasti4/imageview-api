'use strict';

const {
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString,
    GraphQLInputObjectType
} = require('graphql');

const resolver = require('../resolvers/visibility.resolvers');
const Image = require('../types/image.type');

module.exports = new GraphQLInputObjectType({
    name: 'VisibilityInputUpdate',
    description: '...',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        user_id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        search: {
            type: GraphQLString
        },
        posts: {
            type: GraphQLString
        },
        albums: {
            type: GraphQLString
        },
    })
});
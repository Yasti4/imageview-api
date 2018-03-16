'use strict';

const {
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString,
    GraphQLInputObjectType
} = require('graphql');

const resolver = require('../resolvers/privacity.resolvers');
const Image = require('../types/image.type');

module.exports = new GraphQLInputObjectType({
    name: 'PrivacityInputInsert',
    description: '...',
    fields: () => ({
        user_id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        search: {
            type: new GraphQLNonNull(GraphQLString)
        },
        posts: {
            type: new GraphQLNonNull(GraphQLString)
        },
        albums: {
            type: new GraphQLNonNull(GraphQLString)
        },
    })
});
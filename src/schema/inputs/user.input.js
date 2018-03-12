'use strict';

const {
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString,
    GraphQLInputObjectType
} = require('graphql');
const GraphQLDate = require('graphql-date');
const resolver = require('../resolvers/user.resolvers');
const Image = require('../types/image.type');

module.exports = new GraphQLInputObjectType({
    name: 'UserInput',
    description: '...',
    fields: () => ({
        email: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        lastname: {
            type: GraphQLString
        },
        role: {
            type: GraphQLString
        }
    })
});
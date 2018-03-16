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
    name: 'UserInputInsert',
    description: '...',
    fields: () => ({
        username: {
            type: GraphQLNonNull(GraphQLString)
        },
        email: {
            type: GraphQLNonNull(GraphQLString)
        },
        password: {
            type: GraphQLNonNull(GraphQLString)
        },
        name: {
            type: GraphQLNonNull(GraphQLString)
        },
        lastname: {
            type: GraphQLNonNull(GraphQLString)
        },
        // image_id: {
        //     type: GraphQLNonNull(GraphQLInt)
        // },
        role: {
            type: GraphQLNonNull(GraphQLString)
        }
    })
});
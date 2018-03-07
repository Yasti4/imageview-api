'use strict';

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString
} = require('graphql');
const GraphQLDate = require('graphql-date');
const resolver = require('../resolvers/user.resolvers');
const Image = require('../types/image.type');

module.exports = new GraphQLObjectType({
    name: 'User',
    description: '...',
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLInt)
        },
        username: {
            type: GraphQLNonNull(GraphQLString)
        },
        email: {
            type: GraphQLNonNull(GraphQLString)
        },
        name: {
            type: GraphQLNonNull(GraphQLString)
        },
        lastname: {
            type: GraphQLNonNull(GraphQLString)
        },
        image: {
            type: GraphQLNonNull(Image),
            resolve: (parent, args, context, info) => {
                return resolver.image(parent, {
                    id: parent.image_id
                }, context, info);
            }
        },
        role: {
            type: GraphQLNonNull(GraphQLString)
        },
        created_at: {
            type: GraphQLDate
        },
        updated_at: {
            type: GraphQLDate
        },
        deleted_at: {
            type: GraphQLDate
        },
    })
});
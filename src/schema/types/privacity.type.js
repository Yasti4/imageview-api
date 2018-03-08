'use strict';

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString
} = require('graphql');
const GraphQLDate = require('graphql-date');
const resolver = require('../resolvers/privacity.resolvers');
const User = require('../types/user.type');

module.exports = new GraphQLObjectType({
    name: 'Privacity',
    description: '...',
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLInt)
        },
        user: {
            type: GraphQLNonNull(User),
            resolve: (parent, args, context, info) => {
                return resolver.user(parent, {
                    id: parent.user_id
                }, context, info);
            }
        },
        search: {
            type: GraphQLNonNull(GraphQLString)
        },
        posts: {
            type: GraphQLNonNull(GraphQLString)
        },
        albums: {
            type: GraphQLNonNull(GraphQLString)
        },
    })
});
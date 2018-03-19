'use strict';

const {
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString,
    GraphQLInputObjectType
} = require('graphql');

const resolver = require('../resolvers/user.resolvers');

module.exports = new GraphQLInputObjectType({
    name: 'UserFollow',
    description: '...',
    fields: () => ({
        user_followed: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        user_follower: {
            type: new GraphQLNonNull(GraphQLInt)
        },
    })
});
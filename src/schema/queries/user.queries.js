'use strict';

const type = require('./../types/user.type');
const resolver = require('./../resolvers/user.resolvers');
const {
	GraphQLNonNull,
	GraphQLList,
	GraphQLString
} = require('graphql');

module.exports = {
	user: {
		type: type,
		args: {
			username: {
				type: GraphQLNonNull(GraphQLString)
			}
		},
		resolve: resolver.user
	},
	users: {
		type: GraphQLNonNull(GraphQLList(type)),
		resolve: resolver.users
	}
};
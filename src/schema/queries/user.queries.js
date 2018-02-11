'use strict';

const type = require('./../types/user.type');
const resolver = require('./../resolvers/user.resolvers');
const {
	GraphQLNonNull,
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
	}
};
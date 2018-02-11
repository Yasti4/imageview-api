'use strict';

const {
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLInt,
	GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
	name: 'UserType',
	description: '...',
	fields: {
		id: {
			type: GraphQLNonNull(GraphQLInt)
		},
		username: {
			type: GraphQLNonNull(GraphQLString)
		},
		email: {
			type: GraphQLNonNull(GraphQLString)
		},
	}
});
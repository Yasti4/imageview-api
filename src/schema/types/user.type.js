'use strict';

const {
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLInt,
	GraphQLString
} = require('graphql');
const GraphQLDate = require('graphql-date');

module.exports = new GraphQLObjectType({
	name: 'User',
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
		name: {
			type: GraphQLNonNull(GraphQLString)
		},
		lastname: {
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
	}
});

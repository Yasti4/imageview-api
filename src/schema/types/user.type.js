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
			type: new GraphQLNonNull(GraphQLInt)
		},
		username: {
			type: new GraphQLNonNull(GraphQLString)
		},
		email: {
			type: new GraphQLNonNull(GraphQLString)
		},
		name: {
			type: new GraphQLNonNull(GraphQLString)
		},
		lastname: {
			type: new GraphQLNonNull(GraphQLString)
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

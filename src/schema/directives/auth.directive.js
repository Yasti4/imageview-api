'use strict';

const {
	GraphQLDirective,
	DirectiveLocation
} = require('graphql');
// const {
// 	GraphQLCustomDirective
// } = require('graphql-directive');

module.exports = new GraphQLDirective({
	name: 'isAuth',
	description: '...',
	locations: [
		DirectiveLocation.FIELD_DEFINITION,
		DirectiveLocation.FIELD,
	],
	// resolve: async (resolve, source, args, context, info) => {
	// 	const value = await resolve();
	// 	console.log(value);
	// 	return value;
	// }
});

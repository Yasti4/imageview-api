'use strict';

module.exports = `directive @auth(
	role: String = "user"
) on OBJECT | FIELD_DEFINITION | FIELD
`;

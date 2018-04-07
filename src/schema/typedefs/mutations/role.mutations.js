'use strict';

module.exports = `
    createRole(name: String!): Role
    updateRole(oldName: String!, newName: String!): Boolean!
    deleteRole(name: String!): Boolean!
`;
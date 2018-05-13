'use strict';

module.exports = `
scalar Upload

type File {
  id: ID!
  path: String!
  filename: String!
  mimetype: String!
  encoding: String!
}
`;

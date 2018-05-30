'use strict';

const GraphQLDate = require('graphql-date');
const { GraphQLUpload } = require('apollo-upload-server');

module.exports = {
  Date: GraphQLDate,
  Upload: GraphQLUpload
};

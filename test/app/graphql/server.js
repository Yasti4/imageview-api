const {graphql} = require('graphql');
const {makeExecutableSchema} = require('apollo-server-express');
const schema = require('./../../../app/graphql/schema');

module.exports = function(source, variables = {}, context = {}, mockSchema = false) {
  return graphql(makeExecutableSchema(schema(mockSchema)), source, null, Object.assign({}, {
    actions: {},
    isAdmin: false,
    isAuth: false,
    userAuth: null,
  }, context), variables);
}

const {graphql} = require('graphql');
const schema = require('./../../../app/graphql/schema');

module.exports = function(source, variables = {}, context = {}, mockSchema = false) {
  return graphql(schema(mockSchema), source, null, {
    actions: {},
    isAdmin: false,
    isAuth: false,
    userAuth: null,
    ...context
  }, variables);
}

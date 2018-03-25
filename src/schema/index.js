'use strict';

const {
  makeExecutableSchema,
  SchemaDirectiveVisitor
} = require('graphql-tools');

class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type);
    type._requiredAuthRole = this.args.requires;
  }
  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
    field._requiredAuthRole = this.args.requires;
  }

  ensureFieldsWrapped(objectType) {
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;
    const fields = objectType.getFields();
    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const {
        resolve = defaultFieldResolver
      } = field;
      field.resolve = async function (...args) {
        const requiredRole =
          field._requiredAuthRole ||
          objectType._requiredAuthRole;
        if (!requiredRole) {
          return resolve.apply(this, args);
        }
        const context = args[2];
        if (!context.isAuth) {
          throw new Error('Not authorized');
        }
        return resolve.apply(this, args);
      };
    });
  }
}

module.exports = makeExecutableSchema({
  typeDefs: `
    directive @auth(
        requires: String = "user"
    ) on OBJECT | FIELD_DEFINITION
    
    scalar Date
    ${require('./types')}
    ${require('./inputs')}
    ${require('./queries')}
    ${require('./mutations')}
  `,
  resolvers: {
    Query: require('./resolvers/queries'),
    Date: require('graphql-date'),
    ...require('./resolvers/fields'),
    Mutation: require('./resolvers/mutations'),
  },
  schemaDirectives: {
    auth: AuthDirective,
  }
});

'use strict';

const {defaultFieldResolver} = require('graphql');
const {SchemaDirectiveVisitor} = require('graphql-tools');

class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type);
    type._requiredAuthRole = this.args.as;
  }

  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
    field._requiredAuthRole = this.args.as;
  }

  ensureFieldsWrapped(objectType) {
    if (objectType._authFieldsWrapped) {
      return;
    }
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();
    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const {resolve = defaultFieldResolver} = field;
      field.resolve = async function (...args) {

        const requiredRole = field._requiredAuthRole || objectType._requiredAuthRole;
        if (!requiredRole) {
          return resolve.apply(this, args);
        }

        const context = args[2];
        if (!context.isAuth) {
          throw new Error('Not authorized');
        } else if (requiredRole === 'admin' && !context.isAdmin) {
          throw new Error('Not authorized');
        } else if (requiredRole === 'owner' && !(context.isAdmin || args[1].userId === context.userAuth.id)) {
          throw new Error('Not authorized');
        } else if (requiredRole === 'user' && !(context.isUser || context.isAdmin)) {
          throw new Error('Not authorized');
        } else {
          return resolve.apply(this, args);
        }
      };
    });
  }
}

module.exports = AuthDirective;

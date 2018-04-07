'use strict';

const { 
  defaultFieldResolver
} = require('graphql');
const {
  SchemaDirectiveVisitor
} = require('graphql-tools');

module.exports = {
  auth: class extends SchemaDirectiveVisitor {

    visitObject(type) {
      this.ensureFieldsWrapped(type);
      type._requiredAuthRole = this.args.role;
    }

    visitFieldDefinition(field, details) {      
      this.ensureFieldsWrapped(details.objectType);
      field._requiredAuthRole = this.args.role;
    }

    ensureFieldsWrapped(objectType) {
      if (objectType._authFieldsWrapped) return;
      objectType._authFieldsWrapped = true;
      const fields = objectType.getFields();
      Object.keys(fields).forEach(fieldName => {
        this.run(fields[fieldName]);
      });
    }

    run(field) {
      const {
        resolve = defaultFieldResolver
      } = field;
      field.resolve = function (...args) {
        const context = args[2];
        if (!context.isAuth || (field._requiredAuthRole === 'admin' && context.userAuth.role !== 'admin')) {
          throw new Error('Not authorized');
        }
        return resolve.apply(this, args);
      };
    }
  }
};

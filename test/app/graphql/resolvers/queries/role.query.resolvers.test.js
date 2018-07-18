import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import roleActions from './../../../../../app/actions/roles';

let sandbox, context;
test.before(() => {
  sandbox = sinon.createSandbox();
  context = {
    actions: {
      roles: roleActions
    }
  }
});
test.after(() => sandbox.restore());

test.serial('role(name)', async t => {
  // Arrange
  sandbox.spy(roleActions, 'find');
  // Act
  await graphql(`query _($name: String!) {
    role(name: $name) {
      name
    }
  }`, {name: 'user'}, context);
  // Assert
  t.truthy(roleActions.find.calledOnce);
  roleActions.find.restore();
});

test.serial('roles', async t => {
  // Arrange
  sandbox.spy(roleActions, 'findAll');
  // Act
  await graphql(`query _ {
    roles {
      name
    }
  }`, {}, context);
  // Assert
  t.truthy(roleActions.findAll.calledOnce);
  roleActions.findAll.restore();
});

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

test('role(name)', async t => {
  // Arrange
  const expected = { name: 'user' };
  sandbox.replace(roleActions, 'find', name => ({name}));
  // Act
  const {data, errors} = await graphql(`query _($name: String!) {
    role(name: $name) {
      name
    }
  }`, expected, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.role, expected);
});

test('roles', async t => {
  // Arrange
  const expected = [{name: 'user', name: 'admin'}];
  sandbox.replace(roleActions, 'findAll', () => expected);
  // Act
  const {data, errors} = await graphql(`query _ {
    roles {
      name
    }
  }`, {}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.roles, expected);
});

import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import userActions from './../../../../../app/actions/users';
import roleActions from './../../../../../app/actions/roles';

let sandbox, context;
test.beforeEach(() => {
  sandbox = sinon.createSandbox();
  context = {
    actions: {
      users: userActions,
      roles: roleActions
    },
    isAdmin: false,
    isAuth: true,
    userAuth: {id: 1}
  };
  sandbox.stub(roleActions, 'findAll').callsFake(() => [{name:'user'}]);
});
test.afterEach(() => sandbox.restore());

test.serial('users(name)', async t => {
  // Arrange
  sandbox.spy(userActions, 'findAllByRole');
  // Act
  await graphql(`query _ {
    roles {
      users {
        id
      }
    }
  }`, {}, context);
  // Assert
  t.truthy(userActions.findAllByRole.calledOnce);
  userActions.findAllByRole.restore();
});

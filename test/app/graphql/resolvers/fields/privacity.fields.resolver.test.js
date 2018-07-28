import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import userActions from './../../../../../app/actions/users';
import privacityActions from './../../../../../app/actions/privacities';

let sandbox, context;
test.beforeEach(() => {
  sandbox = sinon.createSandbox();
  context = {
    actions: {
      users: userActions,
      privacities: privacityActions
    },
    isAdmin: false,
    isAuth: true,
    userAuth: {id: 1}
  };
  sandbox.stub(privacityActions, 'findAll').callsFake(() => [{id:1}]);
});
test.afterEach(() => sandbox.restore());

test.serial('user(id)', async t => {
  // Arrange
  sandbox.spy(userActions, 'findById');
  // Act
  await graphql(`query _ {
    privacities {
      user {
        id
      }
    }
  }`, {}, context);
  // Assert
  t.truthy(userActions.findById.calledOnce);
  userActions.findById.restore();
});

import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import privacityActions from './../../../../../app/actions/privacities';
import userActions from './../../../../../app/actions/users';

let sandbox, context;
test.before(() => {
  sandbox = sinon.createSandbox();
  context = {
    actions: {
      privacities: privacityActions,
      users: userActions
    }
  }
});
test.after(() => sandbox.restore());

test.serial('privacity(userId)', async t => {
  // Arrange
  sandbox.spy(userActions, 'privacity');
  // Act
  await graphql(`query _($userId: Int!) {
    privacity(userId: $userId) {
      search
    }
  }`, {userId: 1}, context);
  // Assert
  t.truthy(userActions.privacity.calledOnce);
  userActions.privacity.restore();
});

test.serial('privacities', async t => {
  // Arrange
  sandbox.spy(privacityActions, 'findAll');
  // Act
  await graphql(`query _ {
    privacities {
      search
    }
  }`, {}, context);
  // Assert
  t.truthy(privacityActions.findAll.calledOnce);
  privacityActions.findAll.restore();
});

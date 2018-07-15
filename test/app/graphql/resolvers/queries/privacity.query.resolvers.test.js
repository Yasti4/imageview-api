import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import privacityActions from './../../../../../app/actions/privacities';
import userActions from './../../../../../app/actions/users';

const privacities = [
  {id: 1, user_id: 1, search: 'public'},
  {id: 2, user_id: 2, search: 'protected'},
  {id: 3, user_id: 3, search: 'private'}
];

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

test('privacity(userId)', async t => {
  // Arrange
  sandbox.replace(userActions, 'privacity', userId => privacities.find(p => p.user_id === userId));
  // Act
  const {data, errors} = await graphql(`query _($userId: Int!) {
    privacity(userId: $userId) {
      search
    }
  }`, {userId: 1}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.privacity.search, privacities[0].search);
});

test('privacities', async t => {
  // Arrange
  sandbox.replace(privacityActions, 'findAll', () => privacities);
  // Act
  const {data, errors} = await graphql(`query _ {
    privacities {
      search
    }
  }`, {}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.privacities, privacities.map(p => ({search: p.search})));
});

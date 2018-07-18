import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import userActions from './../../../../../app/actions/users';

const users = [
  {id: 1, email: 'foo@imageview.com', username: 'foo', deleted_at: new Date()},
  {id: 2, email: 'ticdenis@imageview.com', username: 'ticdenis', deleted_at: null},
  {id: 3, email: 'yasti@imageview.com', username: 'yasti', deleted_at: null}
];

let sandbox, context;
test.beforeEach(() => {
  sandbox = sinon.createSandbox();
  context = {
    actions: {
      users: userActions
    }
  }
});
test.afterEach(() => sandbox.restore());

test.serial('user', async t => {
  // Act
  const {data, errors} = await graphql(`query _ {
    user {
      username
    }
  }`, {}, context);
  // Assert
  t.falsy(errors);
  t.falsy(data.user);
});

test.serial('user(id, withTrashed)', async t => {
  // Arrange
  sandbox.spy(userActions, 'findById');
  // Act
  await graphql(`query _($id: Int!) {
    user(id: $id) {
      username
    }
  }`, {id: 2, withTrashed: false}, context);
  // Assert
  t.truthy(userActions.findById.calledOnce);
  userActions.findById.restore();
});

test.serial('user(username, withTrashed)', async t => {
  // Arrange
  sandbox.spy(userActions, 'findByUsername');
  // Act
  await graphql(`query _($username: String!) {
    user(username: $username) {
      username
    }
  }`, {username: 'ticdenis', withTrashed: false}, context);
  // Assert
  t.truthy(userActions.findByUsername.calledOnce);
  userActions.findByUsername.restore();
});

test.serial('user(email, withTrashed)', async t => {
  // Arrange
  sandbox.spy(userActions, 'findByEmail');
  // Act
  await graphql(`query _($email: String!) {
    user(email: $email) {
      username
    }
  }`, {email: 'ticdenis@imageview.com', withTrashed: false}, context);
  // Assert
  t.truthy(userActions.findByEmail.calledOnce);
  userActions.findByEmail.restore();
});

test.serial('users(limit, withTrashed)', async t => {
  // Arrange
  sandbox.spy(userActions, 'findAll');
  // Act
  await graphql(`query _ {
    users {
      id
    }
  }`, {limit: 3, withTrashed: false}, context);
  // Assert
  t.truthy(userActions.findAll.calledOnce);
  userActions.findAll.restore();
});

test.serial('me', async t => {
  // Arrange
  context = Object.assign({}, context, {
    isAuth: true,
    userAuth: {id: 1}
  });
  // Act
  const {data, errors} = await graphql(`query _ {
    me {
      id
    }
  }`, {}, context);
  // Assert
  t.falsy(errors);
  t.is(data.me.id, 1);
});

test.serial('me(token)', async t => {
  // Arrange
  sandbox.spy(userActions, 'me');
  // Act
  await graphql(`query _($token: String!) {
    me(token: $token) {
      id
    }
  }`, {token: '...'}, context);
  // Assert
  t.truthy(userActions.me.calledOnce);
  userActions.me.restore();
});

import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import userActions from './../../../../../app/actions/users';

const users = [
  {id: 1, email: 'foo@imageview.com', username: 'foo', deleted_at: new Date()},
  {id: 2, email: 'ticdenis@imageview.com', username: 'ticdenis', deleted_at: null},
  {id: 3, email: 'yasti@imageview.com', username: 'yasti', deleted_at: null}
];

const findByIdFn = (id, withTrashed = false) => users.find(user =>
  user.id === id && (withTrashed ? true : user.deleted_at === null)
);

const findByUsernameFn = (username, withTrashed = false) => users.find(user =>
  user.username === username && (withTrashed ? true : user.deleted_at === null)
);

const findByEmailFn = (email, withTrashed = false) => users.find(user =>
  user.email === email && (withTrashed ? true : user.deleted_at === null)
);

const findAllFn = (limit, withTrashed = false) => (withTrashed
  ? users : users.filter(user => user.deleted_at === null)
).slice(0, limit);

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

test('user', async t => {
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

test('user(id, withTrashed = false)', async t => {
  // Arrange
  sandbox.replace(userActions, 'findById', findByIdFn);
  // Act
  const {data, errors} = await graphql(`query _($id: Int!) {
    user(id: $id) {
      username
    }
  }`, {id: 2, withTrashed: false}, context);
  // Assert
  t.falsy(errors);
  t.is(data.user.username, users[1].username);
});

test('user(id, withTrashed = true)', async t => {
  // Arrange
  sandbox.replace(userActions, 'findById', findByIdFn);
  // Act
  const {data, errors} = await graphql(`query _($id: Int!) {
    user(id: $id) {
      username
    }
  }`, {id: 2, withTrashed: true}, context);
  // Assert
  t.falsy(errors);
  t.is(data.user.username, users[1].username);
});

test('user(username, withTrashed = false)', async t => {
  // Arrange
  sandbox.replace(userActions, 'findByUsername', findByUsernameFn);
  // Act
  const {data, errors} = await graphql(`query _($username: String!) {
    user(username: $username) {
      username
    }
  }`, {username: 'ticdenis', withTrashed: false}, context);
  // Assert
  t.falsy(errors);
  t.is(data.user.username, users[1].username);
});

test('user(username, withTrashed = true)', async t => {
  // Arrange
  sandbox.replace(userActions, 'findByUsername', findByUsernameFn);
  // Act
  const {data, errors} = await graphql(`query _($username: String!) {
    user(username: $username) {
      username
    }
  }`, {username: 'yasti', withTrashed: true}, context);
  // Assert
  t.falsy(errors);
  t.is(data.user.username, users[2].username);
});

test('user(email, withTrashed = false)', async t => {
  // Arrange
  sandbox.replace(userActions, 'findByEmail', findByEmailFn);
  // Act
  const {data, errors} = await graphql(`query _($email: String!) {
    user(email: $email) {
      username
    }
  }`, {email: 'ticdenis@imageview.com', withTrashed: false}, context);
  // Assert
  t.falsy(errors);
  t.is(data.user.username, users[1].username);
});

test('user(email, withTrashed = true)', async t => {
  // Arrange
  sandbox.replace(userActions, 'findByEmail', findByEmailFn);
  // Act
  const {data, errors} = await graphql(`query _($email: String!) {
    user(email: $email) {
      username
    }
  }`, {email: 'yasti@imageview.com', withTrashed: true}, context);
  // Assert
  t.falsy(errors);
  t.is(data.user.username, users[2].username);
});

test('users(limit, withTrashed = false)', async t => {
  // Arrange
  sandbox.replace(userActions, 'findAll', findAllFn);
  // Act
  const {data, errors} = await graphql(`query _ {
    users {
      id
    }
  }`, {limit: 3, withTrashed: false}, context);
  // Assert
  t.falsy(errors);
  t.is(data.users.length, 2)
});

test('users(limit, withTrashed = true)', async t => {
  // Arrange
  sandbox.replace(userActions, 'findAll', findAllFn);
  // Act
  const {data, errors} = await graphql(`query _ {
    users {
      id
    }
  }`, {limit: 3, withTrashed: true}, context);
  // Assert
  t.falsy(errors);
  t.is(data.users.length, 2)
});

test('me', async t => {
  // Arrange
  context = Object.assign({}, context, {
    isAuth: true,
    userAuth: {id: 1}
  })
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

test('me(token)', async t => {
  // Arrange
  sandbox.replace(userActions, 'me', () => users[1]);
  // Act
  const {data, errors} = await graphql(`query _($token: String!) {
    me(token: $token) {
      id
    }
  }`, {token: '...'}, context);
  // Assert
  t.falsy(errors);
  t.is(data.me.id, users[1].id);
});

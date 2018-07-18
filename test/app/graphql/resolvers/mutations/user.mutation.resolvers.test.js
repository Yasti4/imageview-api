
import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import mailHelpers from './../../../../../app/helpers/mail';
import userActions from './../../../../../app/actions/users';

let sandbox, context;
test.beforeEach(() => {
  sandbox = sinon.createSandbox();
  sandbox.replace(mailHelpers, 'sendMail', () => Promise.resolve(true));
  context = {
    actions: {
      users: userActions
    },
    isAdmin: false,
    isAuth: true,
    userAuth: {id: 1}
  };
});
test.afterEach(() => sandbox.restore());

test.serial('signIn(email, password)', async t => {
  // Arrange
  sandbox.spy(userActions, 'token');
  // Act
  await graphql(`mutation _($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      accessToken
    }
  }`, {email: 'test@imageview.com', password: 'secret'}, context);
  // Assert
  t.truthy(userActions.token.calledOnce);
  userActions.token.restore();
});

test.serial('createUser(input)', async t => {
  // Arrange
  const variables = {input: {
    image_id: 1,
    username: 'imageview',
    name: 'image',
    lastname: 'view',
    role: 'user',
    email: 'test@imageview.com',
    password: 'secret'
  }};
  sandbox.replace(userActions, 'create', () => 0);
  // Act
  let res = await graphql(`mutation _($input: UserInput!) {
    createUser(input: $input) {
      id
    }
  }`, variables, context);
  // Assert
  t.is(res.data.createUser, null);
  // Arrange
  sandbox.restore();
  sandbox.replace(userActions, 'create', () => 1);
  sandbox.replace(userActions, 'findById', id => Object.assign({}, variables.input, {id}));
  // Act
  res = await graphql(`mutation _($input: UserInput!) {
    createUser(input: $input) {
      id
    }
  }`, variables, context);
  // Assert
  t.truthy(res.data.createUser.id);
});

test.serial('updateUser(input)', async t => {
  // Arrange
  const variables = {input: {
    image_id: 1,
    username: 'imageview',
    name: 'image',
    lastname: 'view',
    role: 'user',
    email: 'test@imageview.com',
    password: 'secret'
  }};
  sandbox.spy(userActions, 'updateByIdAndUsername');
  sandbox.spy(userActions, 'updateByUsername');
  // Act
  await graphql(`mutation _($input: UserInput!) {
    updateUser(input: $input)
  }`, variables, context);
  // Assert
  t.truthy(userActions.updateByIdAndUsername.calledOnce);
  userActions.updateByIdAndUsername.restore();
  // Act
  await graphql(`mutation _($input: UserInput!) {
    updateUser(input: $input)
  }`, variables, Object.assign({}, context, {isAdmin: true}));
  // Assert
  t.truthy(userActions.updateByUsername.calledOnce);
  userActions.updateByUsername.restore();
});

test.serial('changePassword(old, new)', async t => {
  // Arrange
  sandbox.spy(userActions, 'changePassword');
  // Act
  await graphql(`mutation _($old: String!, $new: String!) {
    changePassword(old: $old, new: $new)
  }`, {old: 'dev@imageview.com', new: 'test@imageview.com'}, context);
  // Assert
  t.truthy(userActions.changePassword.calledOnce);
  userActions.changePassword.restore();
});

test.serial('updateUserPrivacity(input)', async t => {
  // Arrange
  sandbox.spy(userActions, 'updatePrivacity');
  // Act
  await graphql(`mutation _($input: UserPrivacityInput!) {
    updateUserPrivacity(input: $input)
  }`, {input: {search: 'public', posts: 'public', albums: 'public'}}, context);
  // Assert
  t.truthy(userActions.updatePrivacity.calledOnce);
  userActions.updatePrivacity.restore();
});

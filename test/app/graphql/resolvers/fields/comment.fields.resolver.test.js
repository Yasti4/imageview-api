import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import userActions from './../../../../../app/actions/users';
import postActions from './../../../../../app/actions/posts';
import commentActions from './../../../../../app/actions/comments';

let sandbox, context;
test.beforeEach(() => {
  sandbox = sinon.createSandbox();
  context = {
    actions: {
      users: userActions,
      posts: postActions,
      comments: commentActions
    },
    isAdmin: false,
    isAuth: true,
    userAuth: {id: 1}
  };
  sandbox.stub(commentActions, 'findById').callsFake((id) => ({id}));
});
test.afterEach(() => sandbox.restore());

test.serial('user(id)', async t => {
  // Arrange
  sandbox.spy(userActions, 'findById');
  // Act
  await graphql(`query _($id: Int!) {
    comment(id: $id) {
      id
      user {
        id
      }
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(userActions.findById.calledOnce);
  userActions.findById.restore();
});

test.serial('post(id)', async t => {
  // Arrange
  sandbox.spy(postActions, 'findById');
  // Act
  await graphql(`query _($id: Int!) {
    comment(id: $id) {
      id
      post {
        id
      }
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(postActions.findById.calledOnce);
  postActions.findById.restore();
});

test.serial('likes(id)', async t => {
  // Arrange
  sandbox.spy(commentActions, 'likes');
  // Act
  await graphql(`query _($id: Int!) {
    comment(id: $id) {
      id
      likes
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(commentActions.likes.calledOnce);
  commentActions.likes.restore();
});

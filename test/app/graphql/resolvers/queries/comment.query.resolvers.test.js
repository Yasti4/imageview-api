import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import commentActions from './../../../../../app/actions/comments';

let sandbox, context;
test.beforeEach(() => {
  sandbox = sinon.createSandbox();
  context = {
    actions: {
      comments: commentActions
    }
  }
});
test.afterEach(() => sandbox.restore());

test.serial('comment(id, withTrashed)', async t => {
  // Arrange
  sandbox.spy(commentActions, 'findById');
  // Act
  await graphql(`query _($id: Int!, $withTrashed: Boolean) {
    comment(id: $id, withTrashed: $withTrashed) {
      content
    }
  }`, {id: 1, withTrashed: false}, context);
  // Assert
  t.truthy(commentActions.findById.calledOnce);
  commentActions.findById.restore();
});

test.serial('comments(limit, withTrashed)', async t => {
  // Arrange
  sandbox.spy(commentActions, 'findAll');
  // Act
  await graphql(`query _($limit: Int, $withTrashed: Boolean) {
    comments(limit: $limit, withTrashed: $withTrashed) {
      content
    }
  }`, {limit: 1, withTrashed: false}, context);
  // Assert
  t.truthy(commentActions.findAll.calledOnce);
  commentActions.findAll.restore();
});

test.serial('comments(userId, limit, withTrashed)', async t => {
  // Arrange
  sandbox.spy(commentActions, 'findAllByUserId');
  // Act
  await graphql(`query _($userId: Int, $limit: Int, $withTrashed: Boolean) {
    comments(userId: $userId, limit: $limit, withTrashed: $withTrashed) {
      content
    }
  }`, {userId: 1, limit: 1, withTrashed: false}, context);
  // Assert
  t.truthy(commentActions.findAllByUserId.calledOnce);
  commentActions.findAllByUserId.restore();
});

test.serial('comments(postId, limit, withTrashed)', async t => {
  // Arrange
  sandbox.spy(commentActions, 'findAllByPostId');
  // Act
  await graphql(`query _($postId: Int, $limit: Int, $withTrashed: Boolean) {
    comments(postId: $postId, limit: $limit, withTrashed: $withTrashed) {
      content
    }
  }`, {postId: 1, limit: 1, withTrashed: false}, context);
  // Assert
  t.truthy(commentActions.findAllByPostId.calledOnce);
  commentActions.findAllByPostId.restore();
});

test.serial('comments(userId, postId, limit, withTrashed)', async t => {
  // Arrange
  sandbox.spy(commentActions, 'findAllByUserIdAndPostId');
  // Act
  await graphql(`query _($userId: Int, $postId: Int, $limit: Int, $withTrashed: Boolean) {
    comments(userId: $userId, postId: $postId, limit: $limit, withTrashed: $withTrashed) {
      content
    }
  }`, {userId: 1, postId: 1, limit: 1, withTrashed: false}, context);
  // Assert
  t.truthy(commentActions.findAllByUserIdAndPostId.calledOnce);
  commentActions.findAllByUserIdAndPostId.restore();
});

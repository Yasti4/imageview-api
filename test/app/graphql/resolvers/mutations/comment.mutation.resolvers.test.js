
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
    },
    isAdmin: false,
    isAuth: true,
    userAuth: {id: 1}
  };
});
test.afterEach(() => sandbox.restore());

test.serial('createComment(input)', async t => {
  // Arrange
  sandbox.replace(commentActions, 'create', () => 1);
  sandbox.spy(commentActions, 'findById');
  // Act
  await graphql(`mutation _($input: CommentInput!) {
    createComment(input: $input) {
      id
    }
  }`, {input: {content: 'A comment', post_id: 1}}, context);
  // Assert
  t.truthy(commentActions.findById.calledOnce);
  commentActions.findById.restore();
});

test.serial('updateComment(id, comment)', async t => {
  // Arrange
  sandbox.spy(commentActions, 'updateByIdAndUserId');
  // Act
  await graphql(`mutation _($id: Int!, $content: String!, $withTrashed: Boolean) {
    updateComment(id: $id, content: $content, withTrashed: $withTrashed)
  }`, {id: 1, content: 'A comment updated', withTrashed: false}, 
    Object.assign({}, context, {isAdmin: false})
  );
  // Assert
  t.truthy(commentActions.updateByIdAndUserId.calledOnce);
  commentActions.updateByIdAndUserId.restore();

  // Arrange
  sandbox.spy(commentActions, 'updateById');
  // Act
  await graphql(`mutation _($id: Int!, $content: String!, $withTrashed: Boolean) {
    updateComment(id: $id, content: $content, withTrashed: $withTrashed)
  }`, {id: 1, content: 'A comment updated again', withTrashed: false},
    Object.assign({}, context, {isAdmin: true})
  );
  // Assert
  t.truthy(commentActions.updateById.calledOnce);
  commentActions.updateById.restore();
});

test.serial('updateComment(id, input)', async t => {
  // Arrange
  sandbox.spy(commentActions, 'updateByIdAndUserId');
  // Act
  await graphql(`mutation _($id: Int!, $content: String!, $withTrashed: Boolean) {
    updateComment(id: $id, content: $content, withTrashed: $withTrashed)
  }`, {id: 1, content: 'A comment updated', withTrashed: true}, 
    Object.assign({}, context, {isAdmin: false})
  );
  // Assert
  t.truthy(commentActions.updateByIdAndUserId.calledOnce);
  commentActions.updateByIdAndUserId.restore();

  // Arrange
  sandbox.spy(commentActions, 'updateById');
  // Act
  await graphql(`mutation _($id: Int!, $content: String!, $withTrashed: Boolean) {
    updateComment(id: $id, content: $content, withTrashed: $withTrashed)
  }`, {id: 1, content: 'A comment updated again', withTrashed: true},
    Object.assign({}, context, {isAdmin: true})
  );
  // Assert
  t.truthy(commentActions.updateById.calledOnce);
  commentActions.updateById.restore();
});

test.serial('deleteComment(id, softDelete)', async t => {
  // Arrange
  sandbox.spy(commentActions, 'deleteByIdAndUserId');
  // Act
  await graphql(`mutation _($id: Int!, $softDelete: Boolean) {
    deleteComment(id: $id, softDelete: $softDelete)
  }`, {id: 1, softDelete: false}, context);
  // Assert
  t.truthy(commentActions.deleteByIdAndUserId.calledOnce);
  commentActions.deleteByIdAndUserId.restore();

  // Arrange
  sandbox.spy(commentActions, 'deleteById');
  // Act
  await graphql(`mutation _($id: Int!, $softDelete: Boolean) {
    deleteComment(id: $id, softDelete: $softDelete)
  }`, {id: 1, softDelete: true}, context);
  // Assert
  t.truthy(commentActions.deleteById.calledOnce);
  commentActions.deleteById.restore();
});

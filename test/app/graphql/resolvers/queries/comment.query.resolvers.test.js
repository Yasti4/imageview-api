import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import commentActions from './../../../../../app/actions/comments';

const comments = [
  {id: 1, content: 'A comment', user_id: 1, post_id: 1, deleted_at: null},
  {id: 2, content: 'A comment trashed', user_id: 1, post_id: 1, deleted_at: new Date()},
  {id: 3, content: 'Another comment', user_id: 2, post_id: 2, deleted_at: null},
  {id: 4, content: 'Another comment trashed', user_id: 2, post_id: 2, deleted_at: new Date()}
];

const findByIdFn = (id, withTrashed = false) => comments.find(comment =>
  comment.id === id && (withTrashed ? true : comment.deleted_at === null)
);

const findAllFn = (limit, withTrashed = false) => (withTrashed
  ? comments : comments.filter(comment => comment.deleted_at === null)
).slice(0, limit);

const findAllByUserIdFn = (userId, limit, withTrashed = false) => (withTrashed
  ? comments.filter(comment => comment.user_id === userId)
  : comments.filter(comment => comment.user_id === userId && comment.deleted_at === null)
).slice(0, limit);

const findAllByPostIdFn = (postId, limit, withTrashed = false) => (withTrashed
  ? comments.filter(comment => comment.post_id === postId)
  : comments.filter(comment => comment.post_id === postId && comment.deleted_at === null)
).slice(0, limit);

const findAllByUserIdAndPostIdFn = (userId, postId, limit, withTrashed = false) => (withTrashed
  ? comments.filter(comment => comment.user_id === userId && comment.post_id === postId)
  : comments.filter(comment => comment.user_id === userId && comment.post_id === postId && comment.deleted_at === null)
).slice(0, limit);

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

test('comment(id, withTrashed = false)', async t => {
  // Arrange
  sandbox.replace(commentActions, 'findById', findByIdFn);
  // Act
  const {data, errors} = await graphql(`query _($id: Int!, $withTrashed: Boolean) {
    comment(id: $id, withTrashed: $withTrashed) {
      content
    }
  }`, {id: 1, withTrashed: false}, context);
  // Assert
  t.falsy(errors);
  t.is(data.comment.content, comments[0].content);
});

test('comment(id, withTrashed = true)', async t => {
  // Arrange
  sandbox.replace(commentActions, 'findById', findByIdFn);
  // Act
  const {data, errors} = await graphql(`query _($id: Int!, $withTrashed: Boolean) {
    comment(id: $id, withTrashed: $withTrashed) {
      content
    }
  }`, {id: 1, withTrashed: true}, context);
  // Assert
  t.falsy(errors);
  t.is(data.comment.content, comments[0].content);
});

test('comments(limit, withTrashed = false)', async t => {
  // Arrange
  const expected = comments.slice(0, 1).map(comment => ({content: comment.content}));
  sandbox.replace(commentActions, 'findAll', findAllFn);
  // Act
  const {data, errors} = await graphql(`query _($limit: Int, $withTrashed: Boolean) {
    comments(limit: $limit, withTrashed: $withTrashed) {
      content
    }
  }`, {limit: 1, withTrashed: false}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.comments, expected);
});

test('comments(limit, withTrashed = true)', async t => {
  // Arrange
  const expected = comments.slice(0, 1).map(comment => ({content: comment.content}));
  sandbox.replace(commentActions, 'findAll', findAllFn);
  // Act
  const {data, errors} = await graphql(`query _($limit: Int, $withTrashed: Boolean) {
    comments(limit: $limit, withTrashed: $withTrashed) {
      content
    }
  }`, {limit: 1, withTrashed: true}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.comments, expected);
});

test('comments(userId, limit, withTrashed = false)', async t => {
  // Arrange
  const expected = comments.slice(0, 1).map(comment => ({content: comment.content}));
  sandbox.replace(commentActions, 'findAllByUserId', findAllByUserIdFn);
  // Act
  const {data, errors} = await graphql(`query _($userId: Int, $limit: Int, $withTrashed: Boolean) {
    comments(userId: $userId, limit: $limit, withTrashed: $withTrashed) {
      content
    }
  }`, {userId: 1, limit: 1, withTrashed: false}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.comments, expected);
});

test('comments(userId, limit, withTrashed = true)', async t => {
  // Arrange
  const expected = comments.slice(2).map(comment => ({content: comment.content}));
  sandbox.replace(commentActions, 'findAllByUserId', findAllByUserIdFn);
  // Act
  const {data, errors} = await graphql(`query _($userId: Int, $limit: Int, $withTrashed: Boolean) {
    comments(userId: $userId, limit: $limit, withTrashed: $withTrashed) {
      content
    }
  }`, {userId: 2, limit: 2, withTrashed: true}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.comments, expected);
});

test('comments(postId, limit, withTrashed = false)', async t => {
  // Arrange
  const expected = comments.slice(0, 1).map(comment => ({content: comment.content}));
  sandbox.replace(commentActions, 'findAllByPostId', findAllByPostIdFn);
  // Act
  const {data, errors} = await graphql(`query _($postId: Int, $limit: Int, $withTrashed: Boolean) {
    comments(postId: $postId, limit: $limit, withTrashed: $withTrashed) {
      content
    }
  }`, {postId: 1, limit: 1, withTrashed: false}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.comments, expected);
});

test('comments(postId, limit, withTrashed = true)', async t => {
  // Arrange
  const expected = comments.slice(2).map(comment => ({content: comment.content}));
  sandbox.replace(commentActions, 'findAllByPostId', findAllByPostIdFn);
  // Act
  const {data, errors} = await graphql(`query _($postId: Int, $limit: Int, $withTrashed: Boolean) {
    comments(postId: $postId, limit: $limit, withTrashed: $withTrashed) {
      content
    }
  }`, {postId: 2, limit: 2, withTrashed: true}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.comments, expected);
});

test('comments(userId, postId, limit, withTrashed = false)', async t => {
  // Arrange
  const expected = comments.slice(0, 1).map(comment => ({content: comment.content}));
  sandbox.replace(commentActions, 'findAllByUserIdAndPostId', findAllByUserIdAndPostIdFn);
  // Act
  const {data, errors} = await graphql(`query _($userId: Int, $postId: Int, $limit: Int, $withTrashed: Boolean) {
    comments(userId: $userId, postId: $postId, limit: $limit, withTrashed: $withTrashed) {
      content
    }
  }`, {userId: 1, postId: 1, limit: 1, withTrashed: false}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.comments, expected);
});

test('comments(userId, postId, limit, withTrashed = true)', async t => {
  // Arrange
  const expected = comments.slice(2).map(comment => ({content: comment.content}));
  sandbox.replace(commentActions, 'findAllByUserIdAndPostId', findAllByUserIdAndPostIdFn);
  // Act
  const {data, errors} = await graphql(`query _($userId: Int, $postId: Int, $limit: Int, $withTrashed: Boolean) {
    comments(userId: $userId, postId: $postId, limit: $limit, withTrashed: $withTrashed) {
      content
    }
  }`, {userId: 2, postId: 2, limit: 2, withTrashed: true}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.comments, expected);
});

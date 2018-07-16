import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import postActions from './../../../../../app/actions/posts';

const posts = [
  {id: 1, description: 'A post', user_id: 1, album_id: 1, deleted_at: null},
  {id: 2, description: 'A post trashed', user_id: 1, album_id: 1, deleted_at: new Date()},
  {id: 3, description: 'Another post', user_id: 2, album_id: 2, deleted_at: null},
  {id: 4, description: 'Another post trashed', user_id: 2, album_id: 2, deleted_at: new Date()}
];

const findByIdFn = (id, withTrashed = false) => posts.find(post =>
  post.id === id && (withTrashed ? true : post.deleted_at === null)
);

const findAllFn = (limit, withTrashed = false) => (withTrashed
  ? posts : posts.filter(post => post.deleted_at === null)
).slice(0, limit);

const findAllByUserIdFn = (userId, limit, withTrashed = false) => (withTrashed
  ? posts.filter(post => post.user_id === userId)
  : posts.filter(post => post.user_id === userId && post.deleted_at === null)
).slice(0, limit);

const findAllByAlbumIdFn = (albumId, limit, withTrashed = false) => (withTrashed
  ? posts.filter(post => post.album_id === albumId)
  : posts.filter(post => post.album_id === albumId && post.deleted_at === null)
).slice(0, limit);

const findAllByUserIdAndAlbumIdFn = (userId, albumId, limit, withTrashed = false) => (withTrashed
  ? posts.filter(post => post.user_id === userId && post.album_id === albumId)
  : posts.filter(post => post.user_id === userId && post.album_id === albumId && post.deleted_at === null)
).slice(0, limit);

let sandbox, context;
test.beforeEach(() => {
  sandbox = sinon.createSandbox();
  context = {
    actions: {
      posts: postActions
    }
  }
});
test.afterEach(() => sandbox.restore());

test('post(id, withTrashed = false)', async t => {
  // Arrange
  sandbox.replace(postActions, 'findById', findByIdFn);
  // Act
  const {data, errors} = await graphql(`query _($id: Int!, $withTrashed: Boolean) {
    post(id: $id, withTrashed: $withTrashed) {
      description
    }
  }`, {id: 1, withTrashed: false}, context);
  // Assert
  t.falsy(errors);
  t.is(data.post.description, posts[0].description);
});

test('post(id, withTrashed = true)', async t => {
  // Arrange
  sandbox.replace(postActions, 'findById', findByIdFn);
  // Act
  const {data, errors} = await graphql(`query _($id: Int!, $withTrashed: Boolean) {
    post(id: $id, withTrashed: $withTrashed) {
      description
    }
  }`, {id: 1, withTrashed: true}, context);
  // Assert
  t.falsy(errors);
  t.is(data.post.description, posts[0].description);
});

test('posts(limit, withTrashed = false)', async t => {
  // Arrange
  const expected = posts.slice(0, 1).map(post => ({description: post.description}));
  sandbox.replace(postActions, 'findAll', findAllFn);
  // Act
  const {data, errors} = await graphql(`query _($limit: Int, $withTrashed: Boolean) {
    posts(limit: $limit, withTrashed: $withTrashed) {
      description
    }
  }`, {limit: 1, withTrashed: false}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.posts, expected);
});

test('posts(limit, withTrashed = true)', async t => {
  // Arrange
  const expected = posts.slice(0, 1).map(post => ({description: post.description}));
  sandbox.replace(postActions, 'findAll', findAllFn);
  // Act
  const {data, errors} = await graphql(`query _($limit: Int, $withTrashed: Boolean) {
    posts(limit: $limit, withTrashed: $withTrashed) {
      description
    }
  }`, {limit: 1, withTrashed: true}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.posts, expected);
});

test('posts(userId, limit, withTrashed = false)', async t => {
  // Arrange
  const expected = posts.slice(0, 1).map(post => ({description: post.description}));
  sandbox.replace(postActions, 'findAllByUserId', findAllByUserIdFn);
  // Act
  const {data, errors} = await graphql(`query _($userId: Int, $limit: Int, $withTrashed: Boolean) {
    posts(userId: $userId, limit: $limit, withTrashed: $withTrashed) {
      description
    }
  }`, {userId: 1, limit: 1, withTrashed: false}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.posts, expected);
});

test('posts(userId, limit, withTrashed = true)', async t => {
  // Arrange
  const expected = posts.slice(2).map(post => ({description: post.description}));
  sandbox.replace(postActions, 'findAllByUserId', findAllByUserIdFn);
  // Act
  const {data, errors} = await graphql(`query _($userId: Int, $limit: Int, $withTrashed: Boolean) {
    posts(userId: $userId, limit: $limit, withTrashed: $withTrashed) {
      description
    }
  }`, {userId: 2, limit: 2, withTrashed: true}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.posts, expected);
});

test('posts(albumId, limit, withTrashed = false)', async t => {
  // Arrange
  const expected = posts.slice(0, 1).map(post => ({description: post.description}));
  sandbox.replace(postActions, 'findAllByAlbumId', findAllByAlbumIdFn);
  // Act
  const {data, errors} = await graphql(`query _($albumId: Int, $limit: Int, $withTrashed: Boolean) {
    posts(albumId: $albumId, limit: $limit, withTrashed: $withTrashed) {
      description
    }
  }`, {albumId: 1, limit: 1, withTrashed: false}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.posts, expected);
});

test('posts(albumId, limit, withTrashed = true)', async t => {
  // Arrange
  const expected = posts.slice(2).map(post => ({description: post.description}));
  sandbox.replace(postActions, 'findAllByAlbumId', findAllByAlbumIdFn);
  // Act
  const {data, errors} = await graphql(`query _($albumId: Int, $limit: Int, $withTrashed: Boolean) {
    posts(albumId: $albumId, limit: $limit, withTrashed: $withTrashed) {
      description
    }
  }`, {albumId: 2, limit: 2, withTrashed: true}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.posts, expected);
});

test('posts(userId, albumId, limit, withTrashed = false)', async t => {
  // Arrange
  const expected = posts.slice(0, 1).map(post => ({description: post.description}));
  sandbox.replace(postActions, 'findAllByUserIdAndAlbumId', findAllByUserIdAndAlbumIdFn);
  // Act
  const {data, errors} = await graphql(`query _($userId: Int, $albumId: Int, $limit: Int, $withTrashed: Boolean) {
    posts(userId: $userId, albumId: $albumId, limit: $limit, withTrashed: $withTrashed) {
      description
    }
  }`, {userId: 1, albumId: 1, limit: 1, withTrashed: false}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.posts, expected);
});

test('posts(userId, albumId, limit, withTrashed = true)', async t => {
  // Arrange
  const expected = posts.slice(2).map(post => ({description: post.description}));
  sandbox.replace(postActions, 'findAllByUserIdAndAlbumId', findAllByUserIdAndAlbumIdFn);
  // Act
  const {data, errors} = await graphql(`query _($userId: Int, $albumId: Int, $limit: Int, $withTrashed: Boolean) {
    posts(userId: $userId, albumId: $albumId, limit: $limit, withTrashed: $withTrashed) {
      description
    }
  }`, {userId: 2, albumId: 2, limit: 2, withTrashed: true}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.posts, expected);
});

test.skip('feed(page, limit)', async t => {
});

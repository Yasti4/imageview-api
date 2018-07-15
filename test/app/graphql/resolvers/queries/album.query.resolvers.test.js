import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import albumActions from './../../../../../app/actions/albums';

const albums = [
  {id: 1, title: 'An album', user_id: 1, deleted_at: null},
  {id: 2, title: 'An album trashed', user_id: 1, deleted_at: new Date()},
  {id: 3, title: 'Another album', user_id: 2, deleted_at: null},
  {id: 4, title: 'Another album trashed', user_id: 2, deleted_at: new Date()}
];

const findByIdFn = (id, withTrashed = false) => albums.find(album =>
  album.id === id && (withTrashed ? true : album.deleted_at === null)
);

const findAllFn = (limit, withTrashed = false) => (withTrashed
  ? albums : albums.filter(album => album.deleted_at === null)
).slice(0, limit);

const findAllByUserIdFn = (userId, limit, withTrashed = false) => (withTrashed
  ? albums.filter(album => album.user_id === userId)
  : albums.filter(album => album.user_id === userId && album.deleted_at === null)
).slice(0, limit);

let sandbox, context;
test.beforeEach(() => {
  sandbox = sinon.createSandbox();
  context = {
    actions: {
      albums: albumActions
    }
  }
});
test.afterEach(() => sandbox.restore());

test('album(id, withTrashed = false)', async t => {
  // Arrange
  const albums = [
    {id: 1, title: 'An album', deleted_at: null},
    {id: 2, title: 'An album trashed', deleted_at: new Date()}
  ];
  sandbox.replace(albumActions, 'findById', findByIdFn);
  // Act
  const {data, errors} = await graphql(`query _($id: Int!) {
    album(id: $id) {
      title
    }
  }`, {id: 1, withTrashed: false}, context);
  // Assert
  t.falsy(errors);
  t.is(data.album.title, albums[0].title);
});

test('album(id, withTrashed = true)', async t => {
  // Arrange
  sandbox.replace(albumActions, 'findById', findByIdFn);
  // Act
  const {data, errors} = await graphql(`query _($id: Int!) {
    album(id: $id) {
      title
    }
  }`, {id: 1, withTrashed: true}, context);
  // Assert
  t.falsy(errors);
  t.is(data.album.title, albums[0].title);
});

test('albums(userId, limit, withTrashed = false)', async t => {
  // Arrange
  const expected = albums.slice(0, 1).map(album => ({title: album.title}));
  sandbox.replace(albumActions, 'findAllByUserId', findAllByUserIdFn);
  // Act
  const {data, errors} = await graphql(`query _($userId: Int, $limit: Int, $withTrashed: Boolean) {
    albums(userId: $userId, limit: $limit, withTrashed: $withTrashed) {
      title
    }
  }`, {userId: 1, limit: 1, withTrashed: false}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.albums, expected);
});

test('albums(userId, limit, withTrashed = true)', async t => {
  // Arrange
  const expected = albums.slice(2).map(album => ({title: album.title}));
  sandbox.replace(albumActions, 'findAllByUserId', findAllByUserIdFn);
  // Act
  const {data, errors} = await graphql(`query _($userId: Int, $limit: Int, $withTrashed: Boolean) {
    albums(userId: $userId, limit: $limit, withTrashed: $withTrashed) {
      title
    }
  }`, {userId: 2, limit: 2, withTrashed: true}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.albums, expected);
});

test('albums(limit, withTrashed = false)', async t => {
  // Arrange
  const expected = albums.slice(0, 1).map(album => ({title: album.title}));
  sandbox.replace(albumActions, 'findAll', findAllFn);
  // Act
  const {data, errors} = await graphql(`query _($limit: Int, $withTrashed: Boolean) {
    albums(limit: $limit, withTrashed: $withTrashed) {
      title
    }
  }`, {limit: 1, withTrashed: false}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.albums, expected);
});

test('albums(limit, withTrashed = true)', async t => {
  // Arrange
  const expected = albums.slice(0, 1).map(album => ({title: album.title}));
  sandbox.replace(albumActions, 'findAll', findAllFn);
  // Act
  const {data, errors} = await graphql(`query _($limit: Int, $withTrashed: Boolean) {
    albums(limit: $limit, withTrashed: $withTrashed) {
      title
    }
  }`, {limit: 1, withTrashed: true}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.albums, expected);
});
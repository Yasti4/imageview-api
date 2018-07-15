import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import albumActions from './../../../../../app/actions/albums';

let albums;

const updateByIdFn = (id, input, withTrashed = false) => {
  const index = albums.findIndex(a => a.id === id && (withTrashed || a.deleted_at === null));
  if (index === -1) {
    return false;
  }
  albums[index] = Object.assign({}, albums[index], input);
  return true;
};

const updateByIdAndUserIdFn = (id, userId, input, withTrashed = false) => {
  const index = albums.findIndex(a => a.id === id && a.user_id === userId && (withTrashed || a.deleted_at === null));
  if (index === -1) {
    return false;
  }
  albums[index] = Object.assign({}, albums[index], input);
  return true;
};

const deleteByIdFn = (id, softDelete = true) => {
  const index = albums.findIndex(a => a.id === id);
  if (index === -1) {
    return false;
  } else if (softDelete) {
    albums[index].deleted_at = new Date();
  } else {
    albums.splice(index, 1);
  }
  return true;
};

const deleteByIdAndUserIdFn = (id, userId, softDelete = true) => {
  const index = albums.findIndex(a => a.id === id && a.user_id === userId);
  if (index === -1) {
    return false;
  } else if (softDelete) {
    albums[index].deleted_at = new Date();
  } else {
    albums.splice(index, 1);
  }
  return true;
};

let sandbox, context;
test.beforeEach(() => {
  sandbox = sinon.createSandbox();
  context = {
    actions: {
      albums: albumActions
    },
    isAdmin: false,
    isAuth: true,
    userAuth: {id: 1}
  };
  albums = [
    {id: 1, title: 'An album1', user_id: 1, description: 'A description1', visibility: 'public', deleted_at: null},
    {id: 2, title: 'An album2', user_id: 1, description: 'A description2', visibility: 'public', deleted_at: new Date()},
    {id: 3, title: 'An album3', user_id: 1, description: 'A description3', visibility: 'public', deleted_at: null},
    {id: 4, title: 'An album4', user_id: 1, description: 'A description4', visibility: 'public', deleted_at: new Date()}
  ];
});
test.afterEach(() => sandbox.restore());

test('createAlbum(input)', async t => {
  // Arrange
  const id = 1;
  const albums = [];
  const input = {title: 'An album', description: 'A description', visibility: 'public'};
  sandbox.replace(albumActions, 'create', (input) => {
    albums.push(Object.assign({}, input, {id}));
    return id;
  });
  sandbox.replace(albumActions, 'findById', (id) => albums.find(a => a.id === id));
  // Act
  const {data, errors} = await graphql(`mutation _($input: AlbumInput!) {
    createAlbum(input: $input) {
      id
    }
  }`, {input}, context);
  // Assert
  t.falsy(errors);
  t.is(data.createAlbum.id, id);
});

test('updateAlbum(id, input, withTrashed = false)', async t => {
  // Arrange
  sandbox.replace(albumActions, 'updateById', updateByIdFn);
  sandbox.replace(albumActions, 'updateByIdAndUserId', updateByIdAndUserIdFn);
  const run = async (isAdmin = false, title) => {
    // Arrange
    const input = {title, visibility: 'public'};
    // Act
    const {data, errors} = await graphql(`mutation _($id: Int!, $input: AlbumInput!, $withTrashed: Boolean) {
      updateAlbum(id: $id, input: $input, withTrashed: $withTrashed)
    }`, {id: 1, input, withTrashed: false}, Object.assign({}, context, {isAdmin}));
    // Assert
    t.falsy(errors);
    t.truthy(data.updateAlbum);
  };
  // Act & Assert
  await run(false, 'An album updated');
  await run(true, 'An album updated again');
});

test('updateAlbum(id, input, withTrashed = true)', async t => {
  // Arrange
  sandbox.replace(albumActions, 'updateById', updateByIdFn);
  sandbox.replace(albumActions, 'updateByIdAndUserId', updateByIdAndUserIdFn);
  const run = async (isAdmin = false, title) => {
    // Arrange
    const input = {title, visibility: 'public'};
    // Act
    const {data, errors} = await graphql(`mutation _($id: Int!, $input: AlbumInput!, $withTrashed: Boolean) {
      updateAlbum(id: $id, input: $input, withTrashed: $withTrashed)
    }`, {id: 2, input, withTrashed: true}, Object.assign({}, context, {isAdmin}));
    // Assert
    t.falsy(errors);
    t.truthy(data.updateAlbum);
  };
  // Act & Assert
  await run(false, 'An album updated');
  await run(true, 'An album updated again');
});

test('deleteAlbum(id, softDelete)', async t => {
  // Arrange
  sandbox.replace(albumActions, 'deleteById', deleteByIdFn);
  sandbox.replace(albumActions, 'deleteByIdAndUserId', deleteByIdAndUserIdFn);
  const run = async (id, softDelete = false) => {
    // Act
    const {data, errors} = await graphql(`mutation _($id: Int!, $softDelete: Boolean) {
      deleteAlbum(id: $id, softDelete: $softDelete)
    }`, {id, softDelete}, context);
    // Assert
    t.falsy(errors);
    t.truthy(data.deleteAlbum);
  };
  // // Act & Assert
  await run(3, false);
  await run(4, true);
});

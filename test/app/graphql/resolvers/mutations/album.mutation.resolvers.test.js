import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import albumActions from './../../../../../app/actions/albums';

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
});
test.afterEach(() => sandbox.restore());

test.serial('createAlbum(input)', async t => {
  // Arrange
  sandbox.spy(albumActions, 'create');
  sandbox.spy(albumActions, 'findById');
  // Act
  await graphql(`mutation _($input: AlbumInput!) {
    createAlbum(input: $input) {
      id
    }
  }`, {input: {title: 'An album', description: 'A description', visibility: 'public'}}, context);
  // Assert
  t.truthy(albumActions.create.calledOnce);
  albumActions.create.restore();
  t.truthy(albumActions.findById.calledOnce);
  albumActions.findById.restore();
});

test.serial('updateAlbum(id, input, withTrashed)', async t => {
  // Arrange
  sandbox.spy(albumActions, 'updateByIdAndUserId');
  // Act
  await graphql(`mutation _($id: Int!, $input: AlbumInput!, $withTrashed: Boolean) {
    updateAlbum(id: $id, input: $input, withTrashed: $withTrashed)
  }`, {id: 1, input: {title: 'An album updated', visibility: 'public'}, withTrashed: false}, 
    Object.assign({}, context, {isAdmin: false})
  );
  // Assert
  t.truthy(albumActions.updateByIdAndUserId.calledOnce);
  albumActions.updateByIdAndUserId.restore();

  // Arrange
  sandbox.spy(albumActions, 'updateById');
  // Act
  await graphql(`mutation _($id: Int!, $input: AlbumInput!, $withTrashed: Boolean) {
    updateAlbum(id: $id, input: $input, withTrashed: $withTrashed)
  }`, {id: 1, input: {title: 'An album updated again', visibility: 'public'}},
    Object.assign({}, context, {isAdmin: true})
  );
  // Assert
  t.truthy(albumActions.updateById.calledOnce);
  albumActions.updateById.restore();
});

test.serial('updateAlbum(id, input, withTrashed)', async t => {
  // Arrange
  sandbox.spy(albumActions, 'updateByIdAndUserId');
  // Act
  await graphql(`mutation _($id: Int!, $input: AlbumInput!, $withTrashed: Boolean) {
    updateAlbum(id: $id, input: $input, withTrashed: $withTrashed)
  }`, {id: 2, input: {title: 'An album updated', visibility: 'public'}, withTrashed: true},
    Object.assign({}, context, {isAdmin: false})
  );
  // Assert
  t.truthy(albumActions.updateByIdAndUserId.calledOnce);
  albumActions.updateByIdAndUserId.restore();

  // Arrange
  sandbox.spy(albumActions, 'updateById');
  // Act
  await graphql(`mutation _($id: Int!, $input: AlbumInput!, $withTrashed: Boolean) {
    updateAlbum(id: $id, input: $input, withTrashed: $withTrashed)
  }`, {id: 2, input: {title: 'An album updated again', visibility: 'public'}, withTrashed: true},
    Object.assign({}, context, {isAdmin: true})
  );
  // Assert
  t.truthy(albumActions.updateById.calledOnce);
  albumActions.updateById.restore();
});

test.serial('deleteAlbum(id, softDelete)', async t => {
  // Arrange
  sandbox.spy(albumActions, 'deleteByIdAndUserId');
  // Act
  await graphql(`mutation _($id: Int!, $softDelete: Boolean) {
    deleteAlbum(id: $id, softDelete: $softDelete)
  }`, {id: 1, softDelete: false}, context);
  // Assert
  t.truthy(albumActions.deleteByIdAndUserId.calledOnce);
  albumActions.deleteByIdAndUserId.restore();

  // Arrange
  sandbox.spy(albumActions, 'deleteById');
  // Act
  await graphql(`mutation _($id: Int!, $softDelete: Boolean) {
    deleteAlbum(id: $id, softDelete: $softDelete)
  }`, {id: 1, softDelete: true}, context);
  // Assert
  t.truthy(albumActions.deleteById.calledOnce);
  albumActions.deleteById.restore();
});

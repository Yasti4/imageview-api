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
    }
  }
});
test.afterEach(() => sandbox.restore());

test.serial('album(id, withTrashed)', async t => {
  // Arrange
  sandbox.spy(albumActions, 'findById');
  // Act
  await graphql(`query _($id: Int!, $withTrashed: Boolean) {
    album(id: $id, withTrashed: $withTrashed) {
      title
    }
  }`, {id: 1, withTrashed: false}, context);
  // Assert
  t.truthy(albumActions.findById.calledOnce);
  albumActions.findById.restore();
});

test.serial('albums(userId, limit, withTrashed)', async t => {
  // Arrange
  sandbox.spy(albumActions, 'findAllByUserId');
  // Act
  await graphql(`query _($userId: Int, $limit: Int, $withTrashed: Boolean) {
    albums(userId: $userId, limit: $limit, withTrashed: $withTrashed) {
      title
    }
  }`, {userId: 1, limit: 1, withTrashed: false}, context);
  // Assert
  t.truthy(albumActions.findAllByUserId.calledOnce);
  albumActions.findAllByUserId.restore();
});

test.serial('albums(limit, withTrashed)', async t => {
  // Arrange
  sandbox.spy(albumActions, 'findAll');
  // Act
  await graphql(`query _($limit: Int, $withTrashed: Boolean) {
    albums(limit: $limit, withTrashed: $withTrashed) {
      title
    }
  }`, {limit: 1, withTrashed: false}, context);
  // Assert
  t.truthy(albumActions.findAll.calledOnce);
  albumActions.findAll.restore();
});

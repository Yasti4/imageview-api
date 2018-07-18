import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import postActions from './../../../../../app/actions/posts';

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

test.serial('post(id, withTrashed)', async t => {
  // Arrange
  sandbox.spy(postActions, 'findById');
  // Act
  await graphql(`query _($id: Int!, $withTrashed: Boolean) {
    post(id: $id, withTrashed: $withTrashed) {
      description
    }
  }`, {id: 1, withTrashed: false}, context);
  // Assert
  t.truthy(postActions.findById.calledOnce);
  postActions.findById.restore();
});

test.serial('posts(limit, withTrashed)', async t => {
  // Arrange
  sandbox.spy(postActions, 'findAll');
  // Act
  await graphql(`query _($limit: Int, $withTrashed: Boolean) {
    posts(limit: $limit, withTrashed: $withTrashed) {
      description
    }
  }`, {limit: 1, withTrashed: false}, context);
  // Assert
  t.truthy(postActions.findAll.calledOnce);
  postActions.findAll.restore();
});

test.serial('posts(userId, limit, withTrashed)', async t => {
  // Arrange
  sandbox.spy(postActions, 'findAllByUserId');
  // Act
  await graphql(`query _($userId: Int, $limit: Int, $withTrashed: Boolean) {
    posts(userId: $userId, limit: $limit, withTrashed: $withTrashed) {
      description
    }
  }`, {userId: 1, limit: 1, withTrashed: false}, context);
  // Assert
  t.truthy(postActions.findAllByUserId.calledOnce);
  postActions.findAllByUserId.restore();
});

test.serial('posts(albumId, limit, withTrashed)', async t => {
  // Arrange
  sandbox.spy(postActions, 'findAllByAlbumId');
  // Act
  await graphql(`query _($albumId: Int, $limit: Int, $withTrashed: Boolean) {
    posts(albumId: $albumId, limit: $limit, withTrashed: $withTrashed) {
      description
    }
  }`, {albumId: 1, limit: 1, withTrashed: false}, context);
  // Assert
  t.truthy(postActions.findAllByAlbumId.calledOnce);
  postActions.findAllByAlbumId.restore();
});

test.serial('posts(userId, albumId, limit, withTrashed)', async t => {
  // Arrange
  sandbox.spy(postActions, 'findAllByUserIdAndAlbumId');
  // Act
  await graphql(`query _($userId: Int, $albumId: Int, $limit: Int, $withTrashed: Boolean) {
    posts(userId: $userId, albumId: $albumId, limit: $limit, withTrashed: $withTrashed) {
      description
    }
  }`, {userId: 1, albumId: 1, limit: 1, withTrashed: false}, context);
  // Assert
  t.truthy(postActions.findAllByUserIdAndAlbumId.calledOnce);
  postActions.findAllByUserIdAndAlbumId.restore();
});

test.serial('feed(page, limit)', async t => {
  // Arrange
  sandbox.spy(postActions, 'feed');
  // Act
  await graphql(`query _($page: Int, $limit: Int) {
    feed(page: $page, limit: $limit) {
      id
    }
  }`, {page: 1, limit: 1}, context);
  // Assert
  t.truthy(postActions.feed.calledOnce);
  postActions.feed.restore();
});

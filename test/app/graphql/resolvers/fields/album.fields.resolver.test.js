import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import albumActions from './../../../../../app/actions/albums';
import postActions from './../../../../../app/actions/posts';

let sandbox, context;
test.beforeEach(() => {
  sandbox = sinon.createSandbox();
  context = {
    actions: {
      albums: albumActions,
      posts: postActions
    },
    isAdmin: false,
    isAuth: true,
    userAuth: {id: 1}
  };
  sandbox.stub(albumActions, 'findById').callsFake((id) => ({id}));
});
test.afterEach(() => sandbox.restore());

test.serial('posts(id)', async t => {
  // Arrange
  sandbox.spy(postActions, 'findAllByAlbumId');
  // Act
  await graphql(`query _($id: Int!) {
    album(id: $id) {
      id
      posts {
        id
      }
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(postActions.findAllByAlbumId.calledOnce);
  postActions.findAllByAlbumId.restore();
});

test.serial('subscribers(id)', async t => {
  // Arrange
  sandbox.spy(albumActions, 'subscribers');
  // Act
  await graphql(`query _($id: Int!) {
    album(id: $id) {
      id
      subscribers {
        id
      }
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(albumActions.subscribers.calledOnce);
  albumActions.subscribers.restore();
});

test.serial('likes(id)', async t => {
  // Arrange
  sandbox.spy(albumActions, 'likes');
  // Act
  await graphql(`query _($id: Int!) {
    album(id: $id) {
      id
      likes
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(albumActions.likes.calledOnce);
  albumActions.likes.restore();
});

import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import userActions from './../../../../../app/actions/users';
import commentActions from './../../../../../app/actions/comments';
import postActions from './../../../../../app/actions/posts';
import albumActions from './../../../../../app/actions/albums';

let sandbox, context;
test.before(() => {
  sandbox = sinon.createSandbox();
  context = {
    actions: {
      users: userActions,
      comments: commentActions,
      posts: postActions,
      albums: albumActions
    },
    isAdmin: false,
    isAuth: true,
    userAuth: {id: 1}
  };
  sandbox.stub(userActions, 'findById').callsFake(id => ({id}));
});
test.after(() => sandbox.restore());

test.serial('image(id)', async t => {
  // Arrange
  sandbox.spy(userActions, 'image');
  // Act
  await graphql(`query _($id: Int!) {
    user(id: $id) {
      id
      image {
        id
      }
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(userActions.image.calledOnce);
  userActions.image.restore();
});

test.serial('following(id)', async t => {
  // Arrange
  sandbox.spy(userActions, 'following');
  // Act
  await graphql(`query _($id: Int!) {
    user(id: $id) {
      id
      following {
        id
      }
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(userActions.following.calledOnce);
  userActions.following.restore();
});

test.serial('followers(id)', async t => {
  // Arrange
  sandbox.spy(userActions, 'followers');
  // Act
  await graphql(`query _($id: Int!) {
    user(id: $id) {
      id
      followers {
        id
      }
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(userActions.followers.calledOnce);
  userActions.followers.restore();
});

test.serial('posts(id)', async t => {
  // Arrange
  sandbox.spy(postActions, 'findAllByUserId');
  // Act
  await graphql(`query _($id: Int!) {
    user(id: $id) {
      id
      posts {
        id
      }
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(postActions.findAllByUserId.calledOnce);
  postActions.findAllByUserId.restore();
});

test.serial('postsLikes(id)', async t => {
  // Arrange
  sandbox.spy(userActions, 'likesPosts');
  // Act
  await graphql(`query _($id: Int!) {
    user(id: $id) {
      id
      postsLikes
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(userActions.likesPosts.calledOnce);
  userActions.likesPosts.restore();
});

test.serial('albums(id)', async t => {
  // Arrange
  sandbox.spy(albumActions, 'findAllByUserId');
  // Act
  await graphql(`query _($id: Int!) {
    user(id: $id) {
      id
      albums {
        id
      }
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(albumActions.findAllByUserId.calledOnce);
  albumActions.findAllByUserId.restore();
});

test.serial('albumsLikes(id)', async t => {
  // Arrange
  sandbox.spy(userActions, 'likesAlbums');
  // Act
  await graphql(`query _($id: Int!) {
    user(id: $id) {
      id
      albumsLikes
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(userActions.likesAlbums.calledOnce);
  userActions.likesAlbums.restore();
});

test.serial('albumsSubscriptions(id)', async t => {
  // Arrange
  sandbox.spy(userActions, 'subscriptionsAlbums');
  // Act
  await graphql(`query _($id: Int!) {
    user(id: $id) {
      id
      albumsSubscriptions
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(userActions.subscriptionsAlbums.calledOnce);
  userActions.subscriptionsAlbums.restore();
});

test.serial('comments(id)', async t => {
  // Arrange
  sandbox.spy(commentActions, 'findAllByUserId');
  // Act
  await graphql(`query _($id: Int!) {
    user(id: $id) {
      id
      comments {
        id
      }
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(commentActions.findAllByUserId.calledOnce);
  commentActions.findAllByUserId.restore();
});

test.serial('commentsLikes(id)', async t => {
  // Arrange
  sandbox.spy(userActions, 'likesComments');
  // Act
  await graphql(`query _($id: Int!) {
    user(id: $id) {
      id
      commentsLikes
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(userActions.likesComments.calledOnce);
  userActions.likesComments.restore();
});

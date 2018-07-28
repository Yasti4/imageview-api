import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import uploadActions from './../../../../../app/actions/uploads';
import userActions from './../../../../../app/actions/users';
import commentActions from './../../../../../app/actions/comments';
import postActions from './../../../../../app/actions/posts';
import albumActions from './../../../../../app/actions/albums';

let sandbox, context;
test.beforeEach(() => {
  sandbox = sinon.createSandbox();
  context = {
    actions: {
      uploads: uploadActions,
      users: userActions,
      comments: commentActions,
      posts: postActions,
      albums: albumActions
    },
    isAdmin: false,
    isAuth: true,
    userAuth: {id: 1}
  };
  sandbox.stub(postActions, 'findById').callsFake(id => ({id}));
});
test.afterEach(() => sandbox.restore());

test.serial('enableComments', async t => {
  // Act
  const res = await graphql(`query _($id: Int!) {
    post(id: $id) {
      id
      enableComments
    }
  }`, {id: 1}, context);
  // Assert
  t.is(typeof Boolean(), typeof res.data.post.enableComments);
});

test.serial('user(id)', async t => {
  // Arrange
  sandbox.spy(userActions, 'findById');
  // Act
  await graphql(`query _($id: Int!) {
    post(id: $id) {
      id
      user {
        id
      }
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(userActions.findById.calledOnce);
  userActions.findById.restore();
});

test.serial('album(id)', async t => {
  // Arrange
  sandbox.spy(albumActions, 'findById');
  // Act
  await graphql(`query _($id: Int!) {
    post(id: $id) {
      id
      album {
        id
      }
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(albumActions.findById.calledOnce);
  albumActions.findById.restore();
});

test.serial('file(id)', async t => {
  // Arrange
  sandbox.spy(uploadActions, 'findFileById');
  // Act
  await graphql(`query _($id: Int!) {
    post(id: $id) {
      id
      file {
        id
      }
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(uploadActions.findFileById.calledOnce);
  uploadActions.findFileById.restore();
});

test.serial('comments(id)', async t => {
  // Arrange
  sandbox.spy(commentActions, 'findAllByPostId');
  // Act
  await graphql(`query _($id: Int!) {
    post(id: $id) {
      id
      comments {
        id
      }
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(commentActions.findAllByPostId.calledOnce);
  commentActions.findAllByPostId.restore();
});

test.serial('tags(id)', async t => {
  // Arrange
  sandbox.spy(postActions, 'tags');
  // Act
  await graphql(`query _($id: Int!) {
    post(id: $id) {
      id
      tags {
        id
      }
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(postActions.tags.calledOnce);
  postActions.tags.restore();
});

test.serial('images(id)', async t => {
  // Arrange
  sandbox.spy(uploadActions, 'findAllImagesByFileId');
  // Act
  await graphql(`query _($id: Int!) {
    post(id: $id) {
      id
      images {
        id
      }
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(uploadActions.findAllImagesByFileId.calledOnce);
  uploadActions.findAllImagesByFileId.restore();
});

test.serial('likes(id)', async t => {
  // Arrange
  sandbox.spy(postActions, 'likes');
  // Act
  await graphql(`query _($id: Int!) {
    post(id: $id) {
      id
      likes
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(postActions.likes.calledOnce);
  postActions.likes.restore();
});

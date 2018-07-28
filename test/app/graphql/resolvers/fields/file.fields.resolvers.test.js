import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import userActions from './../../../../../app/actions/users';
import postActions from './../../../../../app/actions/posts';
import uploadActions from './../../../../../app/actions/uploads';

let sandbox, context;
test.beforeEach(() => {
  sandbox = sinon.createSandbox();
  context = {
    actions: {
      users: userActions,
      posts: postActions,
      uploads: uploadActions
    },
    isAdmin: false,
    isAuth: true,
    userAuth: {id: 1}
  };
  sandbox.stub(uploadActions, 'uploadImage').callsFake((file, id = 1) => ({id, images:[{id}], user:{id}, post:{id}}));
});
test.afterEach(() => sandbox.restore());

test.serial('images(id)', async t => {
  // Arrange
  sandbox.spy(uploadActions, 'findAllImagesByFileId');
  // Act
  await graphql(`mutation _($file: Upload) {
    uploadImage(file: $file) {
      id
      images {
        id
      }
    }
  }`, {file: null}, context);
  // Assert
  t.truthy(uploadActions.findAllImagesByFileId.calledOnce);
  uploadActions.findAllImagesByFileId.restore();
});

test.serial('user(id)', async t => {
  // Arrange
  sandbox.spy(userActions, 'findByFileId');
  // Act
  await graphql(`mutation _($file: Upload) {
    uploadImage(file: $file) {
      id
      user {
        id
      }
    }
  }`, {file: null}, context);
  // Assert
  t.truthy(userActions.findByFileId.calledOnce);
  userActions.findByFileId.restore();
});

test.serial('post(id)', async t => {
  // Arrange
  sandbox.spy(postActions, 'findByFileId');
  // Act
  await graphql(`mutation _($file: Upload) {
    uploadImage(file: $file) {
      id
      post {
        id
      }
    }
  }`, {file: null}, context);
  // Assert
  t.truthy(postActions.findByFileId.calledOnce);
  postActions.findByFileId.restore();
});

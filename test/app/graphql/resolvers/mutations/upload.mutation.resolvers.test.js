
import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import uploadActions from './../../../../../app/actions/uploads';

let sandbox, context;
test.beforeEach(() => {
  sandbox = sinon.createSandbox();
  context = {
    actions: {
      uploads: uploadActions
    },
    isAdmin: false,
    isAuth: true,
    userAuth: {id: 1}
  };
});
test.afterEach(() => sandbox.restore());

test.serial('uploadImage(file)', async t => {
  // Arrange
  sandbox.spy(uploadActions, 'uploadImage');
  // Act
  await graphql(`mutation _($file: Upload) {
    uploadImage(file: $file) {
      id
    }
  }`, {file: null}, context);
  // Assert
  t.truthy(uploadActions.uploadImage.calledOnce);
  uploadActions.uploadImage.restore();
});

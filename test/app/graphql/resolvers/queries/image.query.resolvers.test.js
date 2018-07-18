import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import uploadActions from './../../../../../app/actions/uploads';

let sandbox, context;
test.before(() => {
  sandbox = sinon.createSandbox();
  context = {
    actions: {
      uploads: uploadActions
    }
  }
});
test.after(() => sandbox.restore());

test.serial('image(id)', async t => {
  // Arrange
  sandbox.spy(uploadActions, 'findImageById');
  // Act
  await graphql(`query _($id: Int!) {
    image(id: $id) {
      id
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(uploadActions.findImageById.calledOnce);
  uploadActions.findImageById.restore();
});

test.serial('images(limit)', async t => {
  // Arrange
  sandbox.spy(uploadActions, 'findAllImages');
  // Act
  await graphql(`query _($limit: Int!) {
    images(limit: $limit) {
      id
    }
  }`, {limit: 2}, context);
  // Assert
  t.truthy(uploadActions.findAllImages.calledOnce);
  uploadActions.findAllImages.restore();
});

test.serial('images(limit, fileId)', async t => {
  // Arrange
  sandbox.spy(uploadActions, 'findAllImagesByFileId');
  // Act
  await graphql(`query _($limit: Int!, $fileId: Int!) {
    images(limit: $limit, fileId: $fileId) {
      id
    }
  }`, {limit: 2, fileId: 1}, context);
  // Assert
  t.truthy(uploadActions.findAllImagesByFileId.calledOnce);
  uploadActions.findAllImagesByFileId.restore();
});

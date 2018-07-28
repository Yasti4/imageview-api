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
  sandbox.stub(uploadActions, 'findImageById').callsFake((id) => ({id}));
});
test.afterEach(() => sandbox.restore());

test.serial('type(width, height)', async t => {
  // Arrange
  sandbox.spy(uploadActions, 'type');
  // Act
  await graphql(`query _($id: Int!) {
    image(id: $id) {
      id
      type
    }
  }`, {id: 1}, context);
  // Assert
  t.truthy(uploadActions.type.calledOnce);
  uploadActions.type.restore();
});

test.serial('file(id)', async t => {
  // Arrange
  sandbox.spy(uploadActions, 'findFileById');
  // Act
  await graphql(`query _($id: Int!) {
    image(id: $id) {
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

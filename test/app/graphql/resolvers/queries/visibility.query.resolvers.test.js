import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import visibilityActions from './../../../../../app/actions/visibilities';

let sandbox, context;
test.before(() => {
  sandbox = sinon.createSandbox();
  context = {
    actions: {
      visibilities: visibilityActions
    }
  }
});
test.after(() => sandbox.restore());

test.serial('visibility(name)', async t => {
  // Arrange
  sandbox.spy(visibilityActions, 'find');
  // Act
  await graphql(`query _($name: String!) {
    visibility(name: $name) {
      name
    }
  }`, {name: 'public'}, context);
  // Assert
  t.truthy(visibilityActions.find.calledOnce);
  visibilityActions.find.restore();
});

test.serial('visibilities', async t => {
  // Arrange
  sandbox.spy(visibilityActions, 'findAll');
  // Act
  await graphql(`query _ {
    visibilities {
      name
    }
  }`, {}, context);
  // Assert
  t.truthy(visibilityActions.findAll.calledOnce);
  visibilityActions.findAll.restore();
});

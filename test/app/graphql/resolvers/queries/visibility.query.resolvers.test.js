import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import visibilityActions from './../../../../../app/actions/visibilities';

const visibilities = [
  {name: 'public'},
  {name: 'protected'},
  {name: 'private'}
];

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

test('visibility(name)', async t => {
  // Arrange
  sandbox.replace(visibilityActions, 'find', (name) => visibilities.find(v => v.name === name));
  // Act
  const {data, errors} = await graphql(`query _($name: String!) {
    visibility(name: $name) {
      name
    }
  }`, {name: 'public'}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.visibility.name, visibilities[0].name);
});

test('visibilities', async t => {
  // Arrange
  sandbox.replace(visibilityActions, 'findAll', () => visibilities);
  // Act
  const {data, errors} = await graphql(`query _ {
    visibilities {
      name
    }
  }`, {}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.visibilities, visibilities);
});

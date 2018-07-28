import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import tagActions from './../../../../../app/actions/tags';

let sandbox, context;
test.beforeEach(() => {
  sandbox = sinon.createSandbox();
  context = {
    actions: {
      tags: tagActions
    },
    isAdmin: false,
    isAuth: true,
    userAuth: {id: 1}
  };
  sandbox.stub(tagActions, 'findAll').callsFake(() => [{name:'foo'}]);
});
test.afterEach(() => sandbox.restore());

test.serial('posts(id)', async t => {
  // Arrange
  sandbox.spy(tagActions, 'posts');
  // Act
  await graphql(`query _ {
    tags {
      posts {
        id
      }
    }
  }`, {}, context);
  // Assert
  t.truthy(tagActions.posts.calledOnce);
  tagActions.posts.restore();
});

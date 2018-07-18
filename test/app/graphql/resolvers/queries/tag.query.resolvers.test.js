import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import tagActions from './../../../../../app/actions/tags';
import userActions from './../../../../../app/actions/users';

let sandbox, context;
test.before(() => {
  sandbox = sinon.createSandbox();
  context = {
    actions: {
      tags: tagActions,
      users: userActions
    }
  }
});
test.after(() => sandbox.restore());

test.serial('tag(name)', async t => {
  // Arrange
  sandbox.spy(tagActions, 'findByName');
  // Act
  await graphql(`query _($name: String!) {
    tag(name: $name) {
      name
    }
  }`, { name: 'node' }, context);
  // Assert
  t.truthy(tagActions.findByName.calledOnce);
  tagActions.findByName.restore();
});

test.serial('tags(limit)', async t => {
  // Arrange
  sandbox.spy(tagActions, 'findAll');
  // Act
  await graphql(`query _ {
    tags {
      name
    }
  }`, {}, context);
  // Assert
  t.truthy(tagActions.findAll.calledOnce);
  tagActions.findAll.restore();
});

test.serial('tags(postId, limit)', async t => {
  // Arrange
  sandbox.spy(tagActions, 'findAllByPostId');
  // Act
  await graphql(`query _($postId: Int!, $limit: Int!) {
    tags(postId: $postId, limit: $limit) {
      name
    }
  }`, {postId: 2, limit: 2}, context);
  // Assert
  t.truthy(tagActions.findAllByPostId.calledOnce);
  tagActions.findAllByPostId.restore();
});

test.serial('search(search, page, limit)', async t => {
  // Arrange
  sandbox.spy(userActions, 'searchByUsername');
  sandbox.spy(tagActions, 'searchByName');
  // Act
  await graphql(`query _($search: String!, $page: Int, $limit: Int) {
    search(search: $search, page: $page, limit: $limit) {
      ...on Tag {
        name
      }
      ...on User {
        username
      }
    }
  }`, {search: 'node', page: 1, limit: 2}, context);
  // Assert
  t.truthy(userActions.searchByUsername.calledOnce);
  userActions.searchByUsername.restore();
  t.truthy(tagActions.searchByName.calledOnce);
  tagActions.searchByName.restore();
});

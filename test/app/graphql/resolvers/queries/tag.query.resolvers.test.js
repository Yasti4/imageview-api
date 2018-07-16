import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import tagActions from './../../../../../app/actions/tags';
import userActions from './../../../../../app/actions/users';

const tags = [
  {name: 'node', post_id: 1},
  {name: 'js', post_id: 1},
  {name: 'sql', post_id: 2}
];

const users = [
  {username: 'hello node'},
  {username: 'bye php'}
];

const findAllPostIdFn = (postId, limit) => tags.filter(t => t.post_id === postId).slice(0, limit);
const searchByNameFn = (name, page, limit) => tags.filter(t => t.name.indexOf(name) > -1).slice(0, limit);
const searchByUsernameFn = (username, page, limit) => users.filter(u => u.username.indexOf(username) > -1).slice(0, limit);

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

test('tag(name)', async t => {
  // Arrange
  const expected = { name: 'node' };
  sandbox.replace(tagActions, 'findByName', name => ({name}));
  // Act
  const {data, errors} = await graphql(`query _($name: String!) {
    tag(name: $name) {
      name
    }
  }`, expected, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.tag, expected);
});

test('tags(limit)', async t => {
  // Arrange
  sandbox.replace(tagActions, 'findAll', (limit) => tags.slice(0, limit));
  // Act
  const {data, errors} = await graphql(`query _ {
    tags {
      name
    }
  }`, {}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.tags, tags.map(t => ({name: t.name})));
});

test('tags(postId, limit)', async t => {
  // Arrange
  sandbox.replace(tagActions, 'findAllByPostId', findAllPostIdFn);
  // Act
  const {data, errors} = await graphql(`query _($postId: Int!, $limit: Int!) {
    tags(postId: $postId, limit: $limit) {
      name
    }
  }`, {postId: 2, limit: 2}, context);
  // Assert
  t.falsy(errors);
  t.deepEqual(data.tags, [{name: tags[2].name}]);
});

test('search(search, page, limit)', async t => {
  // Arrange
  sandbox.replace(userActions, 'searchByUsername', searchByUsernameFn);
  sandbox.replace(tagActions, 'searchByName', searchByNameFn);
  // Act
  const {data, errors} = await graphql(`query _($search: String!, $page: Int, $limit: Int) {
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
  t.falsy(errors);
  t.is(data.search.length, 2);
});

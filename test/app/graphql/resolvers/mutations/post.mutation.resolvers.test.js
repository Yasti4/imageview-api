
import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import orm from './../../../../../app/orm';
import postActions from './../../../../../app/actions/posts';
import tagActions from './../../../../../app/actions/tags';

let sandbox, context;
test.beforeEach(() => {
  sandbox = sinon.createSandbox();
  sandbox.replace(orm, 'trx', fn => fn());
  context = {
    actions: {
      posts: postActions,
      tags: tagActions
    },
    isAdmin: false,
    isAuth: true,
    userAuth: {id: 1}
  };
});
test.afterEach(() => sandbox.restore());

test.serial('createPost(input)', async t => {
  // Arrange
  sandbox.replace(postActions, 'create', (input) => ({...{input, id: 1}}));
  sandbox.replace(tagActions, 'findOrCreate', a => a);
  sandbox.replace(postActions, 'addTag', () => {});
  sandbox.replace(postActions, 'findById', id => id);
  // Act
  const {data, errors} = await graphql(`mutation _($input: PostInput!) {
    createPost(input: $input) {
      id
    }
  }`, {input: {
    description: 'A description',
    album_id: 1,
    file_id: 1,
    visibility: 'public',
    enable_comments: true,
    tags: ['cat', 'dog']
  }}, context);
  // Assert
  t.falsy(errors);
  t.is(data.createPost.id, 1);
});

test.serial('updatePost(id, input, withTrashed)', async t => {
  // Arrange
  const variables = {
    id: 1,
    input: {
      description: 'A description',
      album_id: 1,
      file_id: 1,
      visibility: 'public',
      enable_comments: true,
      tags: ['cat', 'dog']
    },
    withTrashed: false
  };
  sandbox.replace(postActions, 'updateById', () => false);
  sandbox.replace(postActions, 'updateByIdAndUserId', () => true);
  sandbox.replace(postActions, 'removeTags', () => {});
  sandbox.replace(tagActions, 'findOrCreate', a => a);
  sandbox.replace(postActions, 'addTag', () => {});
  // Act
  let res = await graphql(`mutation _($id: Int!, $input: PostInput!, $withTrashed: Boolean) {
    updatePost(id: $id, input: $input, withTrashed: $withTrashed)
  }`, variables, context);
  // Assert
  t.falsy(res.errors);
  t.true(res.data.updatePost);
  // Act
  res = await graphql(`mutation _($id: Int!, $input: PostInput!, $withTrashed: Boolean) {
    updatePost(id: $id, input: $input, withTrashed: $withTrashed)
  }`, variables, Object.assign({}, context, {isAdmin: true}));
  // Assert
  t.falsy(res.errors);
  t.false(res.data.updatePost);
});

test.serial('deletePost(id, softDelete)', async t => {
  // Arrange
  sandbox.spy(postActions, 'deleteByIdAndUserId');
  // Act
  await graphql(`mutation _($id: Int!, $softDelete: Boolean) {
    deletePost(id: $id, softDelete: $softDelete)
  }`, {id: 1, softDelete: false}, context);
  // Assert
  t.truthy(postActions.deleteByIdAndUserId.calledOnce);
  postActions.deleteByIdAndUserId.restore();
  // Arrange
  sandbox.spy(postActions, 'deleteById');
  // Act
  await graphql(`mutation _($id: Int!, $softDelete: Boolean) {
    deletePost(id: $id, softDelete: $softDelete)
  }`, {id: 1, softDelete: true}, context);
  // Assert
  t.truthy(postActions.deleteById.calledOnce);
  postActions.deleteById.restore();
});

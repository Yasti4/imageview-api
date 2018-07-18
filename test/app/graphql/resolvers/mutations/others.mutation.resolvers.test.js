
import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import albumActions from './../../../../../app/actions/albums';
import commentActions from './../../../../../app/actions/comments';
import postActions from './../../../../../app/actions/posts';
import userActions from './../../../../../app/actions/users';

let sandbox, context;
test.beforeEach(() => {
  sandbox = sinon.createSandbox();
  context = {
    actions: {
      albums: albumActions,
      comments: commentActions,
      posts: postActions,
      users: userActions
    },
    isAdmin: false,
    isAuth: true,
    userAuth: {id: 1}
  };
});
test.afterEach(() => sandbox.restore());

test.serial('like', async t => {
  // Act
  const {data, errors} = await graphql(`mutation _($input: LikeInput!) {
    like(input: $input)
  }`, {input: {}}, context);
  // Assert
  t.falsy(errors);
  t.false(data.like);
});

test.serial('like(post_id)', async t => {
  // Arrange
  sandbox.spy(postActions, 'like');
  // Act
  await graphql(`mutation _($input: LikeInput!) {
    like(input: $input)
  }`, {input: {post_id: 1}}, context);
  // Assert
  t.truthy(postActions.like.calledOnce);
  postActions.like.restore();
});

test.serial('like(album_id)', async t => {
  // Arrange
  sandbox.spy(albumActions, 'like');
  // Act
  await graphql(`mutation _($input: LikeInput!) {
    like(input: $input)
  }`, {input: {album_id: 1}}, context);
  // Assert
  t.truthy(albumActions.like.calledOnce);
  albumActions.like.restore();
});

test.serial('like(comment_id)', async t => {
  // Arrange
  sandbox.spy(commentActions, 'like');
  // Act
  await graphql(`mutation _($input: LikeInput!) {
    like(input: $input)
  }`, {input: {comment_id: 1}}, context);
  // Assert
  t.truthy(commentActions.like.calledOnce);
  commentActions.like.restore();
});

test.serial('follow', async t => {
  // Act
  const {data, errors} = await graphql(`mutation _($input: FollowInput!) {
    follow(input: $input)
  }`, {input: {}}, context);
  // Assert
  t.falsy(data.errors);
  t.false(data.follow);
});

test.serial('follow(user_follower, user_followed)', async t => {
  // Arrange
  sandbox.spy(userActions, 'follow');
  // Act
  await graphql(`mutation _($input: FollowInput!) {
    follow(input: $input)
  }`, {input: {user_follower: 1, user_followed: 2}}, context);
  // Assert
  t.truthy(userActions.follow.calledOnce);
  userActions.follow.restore();
});

test.serial('follow(album_id)', async t => {
  // Arrange
  sandbox.spy(albumActions, 'follow');
  // Act
  await graphql(`mutation _($input: FollowInput!) {
    follow(input: $input)
  }`, {input: {album_id: 1}}, context);
  // Assert
  t.truthy(albumActions.follow.calledOnce);
  albumActions.follow.restore();
});

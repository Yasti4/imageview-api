import test from 'ava';

import otherFieldResolvers from './../../../../../app/graphql/resolvers/fields/others.fields.resolver';

test.serial('SearchResult(User)', async t => {
  // Arrange
  const obj = {username: 'imageview'};
  // Act
  const expected = otherFieldResolvers.SearchResult.__resolveType(obj);
  // Assert
  t.is('User', expected);
});

test.serial('SearchResult(Tag)', async t => {
  // Arrange
  const obj = {name: 'a tag'};
  // Act
  const expected = otherFieldResolvers.SearchResult.__resolveType(obj);
  // Assert
  t.is('Tag', expected);
});

test.serial('Timestamps(User)', async t => {
  // Arrange
  const obj = {username: 'imageview'};
  // Act
  const expected = otherFieldResolvers.Timestamps.__resolveType(obj);
  // Assert
  t.is('User', expected);
});

test.serial('Timestamps(Post)', async t => {
  // Arrange
  const obj = {enableComments: true};
  // Act
  const expected = otherFieldResolvers.Timestamps.__resolveType(obj);
  // Assert
  t.is('Post', expected);
});

test.serial('Timestamps(File)', async t => {
  // Arrange
  const obj = {filename: 'image.png'};
  // Act
  const expected = otherFieldResolvers.Timestamps.__resolveType(obj);
  // Assert
  t.is('File', expected);
});

test.serial('Timestamps(Comment)', async t => {
  // Arrange
  const obj = {content: 'a content'};
  // Act
  const expected = otherFieldResolvers.Timestamps.__resolveType(obj);
  // Assert
  t.is('Comment', expected);
});

test.serial('Timestamps(Album)', async t => {
  // Arrange
  const obj = {description: 'a description'};
  // Act
  const expected = otherFieldResolvers.Timestamps.__resolveType(obj);
  // Assert
  t.is('Album', expected);
});

test.serial('Timestamps()', async t => {
  // Arrange
  const obj = {};
  // Act
  const expected = otherFieldResolvers.Timestamps.__resolveType(obj);
  // Assert
  t.is(null, expected);
});

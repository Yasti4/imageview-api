import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import uploadActions from './../../../../../app/actions/uploads';

const images = [
  {id: 1, file_id: 1},
  {id: 2, file_id: 2},
];

const findImageByIdFn = (id) => images.find(image => image.id === id);
const findAllImagesByFileIdFn = (limit, fileId) => images.filter(image => image.file_id === fileId).slice(0, limit);
const findAllImagesFn = (limit) => images.slice(0, limit)

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

test('image(id)', async t => {
  // Arrange
  sandbox.replace(uploadActions, 'findImageById', findImageByIdFn);
  // Act
  const {data, errors} = await graphql(`query _($id: Int!) {
    image(id: $id) {
      id
    }
  }`, {id: 1}, context);
  // Assert
  t.falsy(errors);
  t.is(data.image.id, images[0].id);
});

test('images(limit)', async t => {
  // Arrange
  sandbox.replace(uploadActions, 'findAllImages', findAllImagesFn);
  // Act
  const {data, errors} = await graphql(`query _($limit: Int!) {
    images(limit: $limit) {
      id
    }
  }`, {limit: 2}, context);
  // Assert
  t.falsy(errors);
  t.is(data.images.length, images.length);
});

test('images(limit, fileId)', async t => {
  // Arrange
  sandbox.replace(uploadActions, 'findAllImagesByFileId', findAllImagesByFileIdFn);
  // Act
  const {data, errors} = await graphql(`query _($limit: Int!, $fileId: Int!) {
    images(limit: $limit, fileId: $fileId) {
      id
    }
  }`, {limit: 2, fileId: 1}, context);
  // Assert
  t.falsy(errors);
  t.is(data.images.length, images.filter(i => i.file_id === 1).length);
});

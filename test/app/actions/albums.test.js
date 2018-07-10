import test from 'ava';
import sinon from 'sinon';

import albumActions from './../../../app/actions/albums';

const now = new Date();
const fakeAlbums = [
  {
    id: 1, title: 'A title1', description: 'A description1', user_id: 1, visibility: 'public',
    created_at: now, updated_at: now,deleted_at: null
  },
  {
    id: 2, title: 'A title2', description: 'A description2', user_id: 1, visibility: 'protected',
    created_at: now, updated_at: now, deleted_at: now
  }
];

test.before(() => {
  sinon.stub(albumActions, 'findById').callsFake(async (id, withTrashed = false) => {
    return await (id <= 0 ? null : id === 1 && !withTrashed 
      ? fakeAlbums[0] : id === 2 && withTrashed ? fakeAlbums[1] : null
    );
  });

  sinon.stub(albumActions, 'findAll').callsFake(async (limit, withTrashed = false) => {
    return await (limit <= 0 ? [] : (withTrashed 
      ? fakeAlbums : fakeAlbums.filter(a => a.deleted_at === null)).slice(0, limit)
    );
  })
  /*
    findAllByUserId,
    findAllByVisibility,
    create,
    updateById,
    updateByIdAndUserId,
    deleteById,
    deleteByIdAndUserId,
    like,
    follow,
    likes,
    subscribers
  */
});

test('findById(id, withTrashed)', async t => {
  let value = await albumActions.findById(1, false);
  let expected = fakeAlbums[0];
  t.is(value, expected);

  value = await albumActions.findById(2, true);
  expected = fakeAlbums[1];
  t.is(value, expected);

  value = await albumActions.findById(-1);
  expected = null;
  t.falsy(value, expected);
});

test('findAll(limit, withTrashed)', async t => {
  let value = await albumActions.findAll(1, false);
  let expected = [fakeAlbums[0]];
  t.deepEqual(value, expected);

  value = await albumActions.findAll(2, true);
  expected = fakeAlbums;
  t.deepEqual(value, expected);

  value = await albumActions.findAll(-1);
  expected = [];
  t.deepEqual(value, expected);
});

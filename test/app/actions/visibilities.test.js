import test from 'ava';
import sinon from 'sinon';

import visibilityActions from './../../../app/actions/visibilities';

test.before(() => {
  sinon.stub(visibilityActions, 'find').resolvesArg(0);
  sinon.stub(visibilityActions, 'findAll').resolves(['public', 'protected', 'private']);
});

test('find(name)', async t => {
  const value = await visibilityActions.find('public');
  const expected = 'public';
  t.is(value, expected);
});

test('findAll()', async t => {
  const value = await visibilityActions.findAll();
  const expected = ['public', 'protected', 'private'];
  t.deepEqual(value, expected);
});

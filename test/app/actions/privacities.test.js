const test = require('ava');
const sinon = require('sinon');

const privacityActions = require('./../../../app/actions/privacities');

test.before(() => {
  sinon.stub(privacityActions, 'find').resolvesArg(0);
  sinon.stub(privacityActions, 'findAll').resolves([{
    id: 1, user_id: 1, search: 'public', posts: 'protected', albums: 'public'
  }]);
});

test('find(name)', async t => {
  const value = await privacityActions.find('public');
  const expected = 'public';
  t.is(value, expected);
});

test('findAll()', async t => {
  const value = await privacityActions.findAll();
  const expected = [{
    id: 1, user_id: 1, search: 'public', posts: 'protected', albums: 'public'
  }];
  t.deepEqual(value, expected);
});

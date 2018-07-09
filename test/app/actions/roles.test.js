const test = require('ava');
const sinon = require('sinon');

const roleActions = require('./../../../app/actions/roles');

test.before(() => {
  sinon.stub(roleActions, 'find').resolvesArg(0);
  sinon.stub(roleActions, 'findAll').resolves(['admin', 'user']);
});

test('find(name)', async t => {
  const value = await roleActions.find('user');
  const expected = 'user';
  t.is(value, expected);
});

test('findAll()', async t => {
  const value = await roleActions.findAll();
  const expected = ['admin', 'user'];
  t.deepEqual(value, expected);
});

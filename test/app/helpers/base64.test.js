import test from 'ava';

import base64 from './../../../app/helpers/base64';

test('btoa(str)', async t => {
  const value = await base64.btoa('hi');
  const expected = 'aGk=';
  t.is(value, expected);
});

test('atob(str)', async t => {
  const value = await base64.atob('aGk=');
  const expected = 'hi';
  t.is(value, expected);
});

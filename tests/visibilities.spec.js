'use strict';

const api = require('./api');

describe('A visibilities tests', () => {
  it('get all visibilities', async () => {
    const result = await api(`{ visibilities { name } }`);
    expect(result.errors).toBeUndefined();
  });
});

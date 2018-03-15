'use strict';

module.exports = {
  isAuth: async (resolve, source, args, context, info) => {
    const value = await resolve();
    console.log(value);
    return value;
  }
};

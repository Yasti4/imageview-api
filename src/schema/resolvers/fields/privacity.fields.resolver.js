'use strict';

module.exports = {
  Privacity: {
    user: (parent, args, context, info) => {
      return parent.getUser();
    }
  }
};

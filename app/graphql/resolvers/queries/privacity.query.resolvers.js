'use strict';

module.exports = {
  privacity: (parent, args, context) => {
    return context.db('privacities').first('user_id', args.userId);
  }
};

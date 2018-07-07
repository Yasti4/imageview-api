'use strict';

module.exports = {
  uploadImage: async (parent, args, context) => {
    return context.actions.uploads.uploadImage(args.file);
  }
};

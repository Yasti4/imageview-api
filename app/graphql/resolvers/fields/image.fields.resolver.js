'use strict';

module.exports = {
  Image: {
    type: (parent, args, context) => {
      return context.actions.uploads.type(parent.width, parent.height);
    },
    file: (parent, args, context) => {
      return context.actions.uploads.findFileById(parent.file_id);
    }
  }
};

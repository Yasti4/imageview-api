'use strict';

module.exports = {
  Image: {
    type: (parent) => {
      const types = {160: 'xs', 320: 'sm', 640: 'md', 1024: 'lg'};
      return types[parent.width] || types[parent.height] || 'unknown';
    },
    file: (parent, args, context) => {
      return context.db('files').first('id', parent.file_id);
    }
  }
};

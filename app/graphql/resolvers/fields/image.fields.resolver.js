'use strict';

module.exports = {
  Image: {
    type: (parent, args, context, info) => {
      const types = { 160: 'xs', 320: 'sm', 640: 'md', 1024: 'lg' };
      return types[parent.width] || types[parent.height] || 'unknown';
    },
    file: (parent, args, context, info) => {
      return context.db.File.find({ where: { id: parent.file_id } });
    }
  }
};

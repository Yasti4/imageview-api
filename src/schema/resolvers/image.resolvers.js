'use strict';

const {
  Image
} = require('./../../models');

module.exports = {
  image: async (parent, args, context, info) => {
    if (args.id) {
      const image = await Image.where('id', args.id).first();
      return image ? image.toJSON() : null;
    } else {
      return null;
    }
  },
  images: async (parent, args, context, info) => {
    return (await Image.get()).toJSON();
  }
};

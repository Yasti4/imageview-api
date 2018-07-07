'use strict';

module.exports = {
  image: (parent, args, context) => {
    return context.actions.images.findImageById(args.id);
  },
  images: (parent, args, context) => {
    return args.fileId
      ? context.actions.images.findAllImagesByFileId(args.limit, args.fileId)
      : context.actions.images.findAllImages(args.limit);
  }
};

'use strict';

module.exports = {
  image: (parent, args, context) => {
    return context.actions.uploads.findImageById(args.id);
  },
  images: (parent, args, context) => {
    return args.fileId
      ? context.actions.uploads.findAllImagesByFileId(args.limit, args.fileId)
      : context.actions.uploads.findAllImages(args.limit);
  }
};

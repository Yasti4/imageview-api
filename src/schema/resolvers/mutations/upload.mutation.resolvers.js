'use strict';

const fs = require('fs');
const { saveImage, imageSizeFrom, resizeImage } = require('./../../../helpers');

module.exports = {
  uploadImage: async (parent, args, context, info) => {
    const imgFolder = process.env.IMAGES_FOLDER;
    const rawFolder = `${imgFolder}/raw`;
    const file = await saveImage(args.file, { uploadDir: rawFolder });
    const filepath = `${rawFolder}/${file.filename}`;
    const filename = `${file.filename.split('.')[0]}.jpg`;
    const size = await imageSizeFrom(filepath);
    const payload = { small: null, medium: null, large: null };
    switch (size.type) {
      case 'xs':
      case 'sm':
        await resizeImage({ ...size, type: 'sm' }, filepath, filename);
        payload.small = `${size.type}/${filename}`;
        break;
      case 'md':
        await resizeImage({ ...size, type: 'sm' }, filepath, filename);
        payload.small = `sm/${filename}`;
        await resizeImage(size, filepath, filename);
        payload.medium = `${size.type}/${filename}`;
        break;
      case 'lg':
        await resizeImage({ ...size, type: 'sm' }, filepath, filename);
        payload.small = `sm/${filename}`;
        await resizeImage({ ...size, type: 'md' }, filepath, filename);
        payload.medium = `md/${filename}`;
        await resizeImage(size, filepath, filename);
        payload.large = `${size.type}/${filename}`;
        break;
      default:
        fs.unlinkSync(filepath);
        throw Error('Image size not found');
    }
    return context.db.Image.create(payload);
  }
};

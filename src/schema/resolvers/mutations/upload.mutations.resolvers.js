'use strict';

const { saveImage } = require('./../../../helpers')
// const sharp = require('sharp');


module.exports = {
  uploadImage: async (parent, args, context, info) => {
    const file = await saveImage(args.file);
    return context.db.Image.create({
      small: file.filename,
      medium: file.filename
    });
  }
};

/*
multipleUpload: async (obj, { files }) => {
  const { resolve, reject } = await Promose.all(files.map(processUpload));
  if (reject.length)
    reject.forEach(({ name, message }) =>
      console.error(`${name}: ${message}`)
    );
  return resolve;
}
*/

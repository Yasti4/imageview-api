'use strict';

const fs = require('fs');
const shortid = require('shortid');

const saveFile = async (file, options = {}) => {
  // Download file
  const { stream, filename, mimetype, encoding } = await file;
  // Validate file
  if (options.validateMimetype && !options.validateMimetype(mimetype)) {
    throw Error('File mimetype not supported');
  }
  // Write file
  const id = shortid.generate()
  const computedName = `${id}-${filename}`.toLowerCase();
  const path = `${options.uploadDir}/${computedName}`
  await new Promise((resolve, reject) =>
    stream.on('error', error => {
      if (stream.truncated) fs.unlinkSync(path)
      reject(error)
    })
    .pipe(fs.createWriteStream(path))
    .on('error', error => reject(error))
    .on('finish', () => resolve({ id, path, computedName }))
  );
  // Return file info
  return { id, filename: computedName, mimetype, encoding, path };
};

exports.saveImage = (file) => {
  return saveFile(file, {
    uploadDir: process.env.IMAGES_FOLDER,
    validateMimetype: (mimetype) => /^(image){1}\/(png|jpg|jpeg){1}$/.test(mimetype)
  });
};

'use strict';

const fs = require('fs');
const shortid = require('shortid');

const saveFile = async (file, options = {}) => {
  // Download file
  const { stream, filename, mimetype, encoding } = await file;
  // Validate file
  if (!options.uploadDir) {
    throw new Error('Upload directory not found');
  }
  if (options.mimetypeRegex && !options.mimetypeRegex.test(mimetype)) {
    throw new Error('File mimetype not supported');
  }
  // Write file
  const id = [ shortid.generate(), shortid.generate() ].join('-');
  const computedName = `${id}.${filename.split('.').pop()}`.toLowerCase();
  const path = `${options.uploadDir}/${computedName}`;
  await new Promise((resolve, reject) =>
    stream.on('error', error => {
      if (stream.truncated) fs.unlinkSync(path);
      reject(error);
    }).pipe(fs.createWriteStream(path)).on('error', error => reject(error)).on('finish', () => resolve({
      id, path, computedName
    }))
  );
  // Return file info
  return { id, filename: computedName, mimetype, encoding, path };
};

exports.saveImage = (file, options = {}) => {
  return saveFile(file, {
    uploadDir: process.env.IMGS_FOLDER,
    mimetypeRegex: /^(image){1}\/(png|jpg|jpeg){1}$/,
    ...options
  });
};

exports.savePDF = (file, options = {}) => {
  return saveFile(file, {
    uploadDir: process.env.PDFS_FOLDER,
    mimetypeRegex: /^(application){1}\/(pdf){1}$/,
    ...options
  });
};

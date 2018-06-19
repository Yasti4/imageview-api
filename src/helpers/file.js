'use strict';

const fs = require('fs');
const shortid = require('shortid');
const imageSize = require('image-size');
const sharp = require('sharp');

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
  const id = shortid.generate();
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
    uploadDir: process.env.IMAGES_FOLDER,
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

exports.imageSizeFrom = async (filepath) => {
  const { width, height } = await imageSize(filepath);
  let obj = { type: null, width, height };
  if ((width >= 160 && width < 320) || (height >= 160 && height < 320)) {
    obj.type = 'xs';
  } else if ((width >= 320 && width < 640) || (height >= 320 && height < 640)) {
    obj.type = 'sm';
  } else if ((width >= 640 && width < 1024) || (height >= 640 && height < 1024)) {
    obj.type = 'md';
  } else if (width >= 1024 || height >= 1024) {
    obj.type = 'lg';
  }
  return obj;
};

exports.resizeImage = (sizeObject, filepath, name) => {
  const sizes = { xs: 160, sm: 320, md: 640, lg: 1024 };
  return sharp(filepath)
    .resize(sizes[sizeObject.type])
    .jpeg({ progressive: true, quality: 75 })
    .toFile(`${process.env.IMAGES_FOLDER}/${sizeObject.type}/${name}`);
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

'use strict';

const fs = require('fs');
const shortid = require('shortid');
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
      if (stream.truncated) {
        fs.unlinkSync(path);
      }
      reject(error);
    }).pipe(fs.createWriteStream(path)).on('error', error => reject(error)).on('finish', () => resolve({
      id, path, computedName
    }))
  );
  // Return file info
  return {id, filename: computedName, mimetype, encoding, path};
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

exports.resizeImages = async (path, filename) => {
  const filepath = `${path}/${filename}`;
  const dimensions = filepath => sharp(filepath).metadata();
  const dim = await dimensions(filepath);
  const sizes = {xs: 160, sm: 320, md: 640, lg: 1024};
  const fileOut = size => `${process.env.IMAGES_FOLDER}/${size}/${filename}`;

  const isSmall = (w, h) => (w >= sizes.xs && w < sizes.md) || (h >= sizes.xs && h < sizes.md);
  const isMedium = (w, h) => (w >= sizes.md && w < sizes.lg) || (h >= sizes.md && h < sizes.lg);
  const isLarge = (w, h) => (w >= sizes.lg || h >= sizes.lg);

  const generate = async size => {
    const newPath = fileOut(size);
    await sharp(filepath).resize(sizes[size]).jpeg({progressive: true, quality: 75}).toFile(newPath);
    const metadata = await dimensions(newPath); 
    return {width: metadata.width, height: metadata.height};
  };
  const generated = [];

  if (isSmall(dim.width, dim.height)) {
    const dimensions = await generate('sm');
    generated.push(dimensions);
  } else if (isMedium(dim.width, dim.height)) {
    const dimensions = await generate('md');
    generated.push(dimensions);
  } else if (isLarge(dim.width, dim.height)) {
    let dimensions = await generate('md');
    generated.push(dimensions);
    dimensions = await generate('lg');
    generated.push(dimensions);
  }

  return generated;
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

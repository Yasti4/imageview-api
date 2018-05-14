'use strict';

const fs = require('fs');
const shortid = require('shortid');

exports.randomItem = (array = []) => array[Math.floor(Math.random() * array.length)];

exports.unixTimestamp = (date = new Date()) => Math.floor(date.getTime() / 1000);

exports.saveFile = (file, uploadDir) => {
  const processUpload = async upload => {
    const { stream, filename, mimetype, encoding } = await upload;
    const { id, path, computedName } = await storeFS(uploadDir, { stream, filename });
    return { id, filename, mimetype, encoding, path, computedName };
  };
  const storeFS = (uploadDir, { stream, filename }) => {
    const id = shortid.generate()
    const computedName = `${id}-${filename}`.toLowerCase();
    const path = `${uploadDir}/${computedName}`
    return new Promise((resolve, reject) =>
      stream.on('error', error => {
        if (stream.truncated) fs.unlinkSync(path)
        reject(error)
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ id, path, computedName }))
    );
  };
  return processUpload(file);
};


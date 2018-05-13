'use strict';

const fs = require('fs');
const shortid = require('shortid');
const promisesAll = require('promises-all')
// const sharp = require('sharp');

const uploadDir = './static/images';

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

const processUpload = async upload => {
  const { stream, filename, mimetype, encoding } = await upload
  const { id, path, computedName } = await storeFS(uploadDir, { stream, filename })
  return { id, filename, mimetype, encoding, path, computedName };
};

module.exports = {
  uploadImage: async (parent, args, context, info) => {
    const file = await processUpload(args.file);
    return context.db.Image.create({
      small: file.computedName,
      medium: file.computedName
    });
  }
};

/*
multipleUpload: async (obj, { files }) => {
  const { resolve, reject } = await promisesAll.all(
    files.map(processUpload)
  )

  if (reject.length)
    reject.forEach(({ name, message }) =>
      // eslint-disable-next-line no-console
      console.error(`${name}: ${message}`)
    )

  return resolve
}
*/
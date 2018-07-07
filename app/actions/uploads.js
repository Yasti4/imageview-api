const {table} = require('app/orm');
const fs = require('fs');
const {saveImage, resizeImages} = require('app/helpers');

module.exports = {
  findFileById,
  findFileByFilename,
  findImageById,
  findAllImages,
  findAllImagesByFileId,
  uploadImage
};

const defaultLimit = 10;

function findFileById(id, withTrashed = false) {
  return withTrashed
    ? table('files').first('id', id)
    : table('files').whereNull('deleted_at').first('id', id);
}

function findFileByFilename(filename, withTrashed = false) {
  return withTrashed
    ? table('files').first('filename', filename)
    : table('files').whereNull('deleted_at').first('filename', filename);
}

function findImageById(id) {
  return table('images').first('id', id);
}

function findAllImages(limit = defaultLimit) {
  return table('images').limit(limit).all();
}

function findAllImagesByFileId(fileId, limit = defaultLimit) {
  return table('images').limit(limit).all('file_id', fileId);
}

async function uploadImage(file) {
  const path = `${process.env.IMAGES_FOLDER}/raw`;
  const fileData = await saveImage(file, {uploadDir: path});
  const filename = `${fileData.filename.split('.')[0]}.jpg`;

  const removeFile = () => fs.unlinkSync(`${path}/${filename}`);
  const insertImage = (input) => table('images').insert(input);

  try {
    const imagesPayload = await resizeImages(path, filename);
    if (imagesPayload.length === 0) {
      removeFile();
      return null;
    }

    const file_id = await table('files').insert({filename});
    if (!file_id) {
      removeFile();
      return null;
    }

    for (let i = 0; i < imagesPayload.length; i = i + 1) {
      await insertImage({...imagesPayload[i], file_id: file_id});
    }

    return findFileById(file_id);
  } catch (err) {
    removeFile();
    return err;
  }
}

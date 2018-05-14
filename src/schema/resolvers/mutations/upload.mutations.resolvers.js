'use strict';

const { saveFile } = require('./../../../helpers')
    // const sharp = require('sharp');


module.exports = {
    uploadImage: async(parent, args, context, info) => {
        const file = await saveFile(args.file, process.env.IMAGES_FOLDER);
        return context.db.Image.create({
            small: file.computedName,
            medium: file.computedName
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
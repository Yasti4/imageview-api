'use strict';

const fs = require('fs');
const { saveImage, resizeImages } = require('./../../../helpers');

module.exports = {
  uploadImage: async (parent, args, context, info) => {
    const path = `${process.env.IMAGES_FOLDER}/raw`;
    const fileData = await saveImage(args.file, { uploadDir: path });
    const filename = `${fileData.filename.split('.')[0]}.jpg`;

    const removeFile = () => fs.unlinkSync(`${path}/${filename}`);

    try {
      const imagesPayload = await resizeImages(path, filename);
      if (imagesPayload.length === 0) {
        removeFile();
        return null;
      }

      const file = await context.db.File.create({ filename });

      for (let i = 0; i < imagesPayload.length; i++) {
        await context.db.Image.create({ ...imagesPayload[i], file_id: file.id });
      }

      return file;
    } catch (err) {
      removeFile();
      return err;
    }
  }
};

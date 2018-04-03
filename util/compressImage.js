const util = require('util');
const path = require('path');
const fs = require('fs');
const Jimp = require('jimp');
const config = require('../config');

module.exports = async function (image) {
  const unlinkPromise = util.promisify(fs.unlink);
  const pathObject = path.parse(image);
  const newNameImage = `${pathObject.name}.jpg`;
  const newPathImage = path.join(config.upload.formidable.uploadDir, newNameImage);
  const uploadFile = await Jimp.read(image);
  await uploadFile.quality(60).write(newPathImage);
  if (pathObject.ext !== '.jpg') {
    await unlinkPromise(image);
  }
  return newPathImage;
};

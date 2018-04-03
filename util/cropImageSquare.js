const util = require('util');
const Jimp = require('jimp');
const sizeOf = util.promisify(require('image-size'));

module.exports = async function (path) {
  const dimensions = await sizeOf(path);
  let left, top, width, height;
  if (dimensions.width !== dimensions.height) {
    if (dimensions.width > dimensions.height) {
      left = (dimensions.width - dimensions.height) / 2;
      top = 0;
      width = height = dimensions.height;
    } else {
      left = 0;
      top = (dimensions.height - dimensions.width) / 2;
      width = height = dimensions.width;
    }
    const uploadFile = await Jimp.read(path);
    await uploadFile.crop(left, top, width, height).write(path);
  }
};

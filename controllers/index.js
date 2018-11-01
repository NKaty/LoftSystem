const fs = require('fs');
const path = require('path');
const { dist } = require('../config');
const util = require('util');
const readFilePromise = util.promisify(fs.readFile);

exports.getIndex = async ctx => {
  ctx.body = await readFilePromise(path.join(dist, 'index.html'), 'utf8');
};

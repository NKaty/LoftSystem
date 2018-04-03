const fs = require('fs');
const path = require('path');
const { dist } = require('../config');

exports.getIndex = async ctx => {
  ctx.body = fs.createReadStream(path.join(dist, 'index.html'), { encoding: 'utf8' });
};

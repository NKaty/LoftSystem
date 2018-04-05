const fs = require('fs');
const path = require('path');

exports.getIndex = async ctx => {
  ctx.body = fs.readFileSync(path.resolve(path.join('dist', 'index.html')), 'utf8');
};

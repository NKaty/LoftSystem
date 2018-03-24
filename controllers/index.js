const fs = require('fs');
const path = require('path');

exports.getIndex = async ctx => {
  console.log(path.resolve(path.join('dist', 'index.html')));
  ctx.body = fs.readFileSync(path.resolve(path.join('dist', 'index.html')), 'utf8');
};

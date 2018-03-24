const serve = require('koa-static');
const path = require('path');
const { root } = require('../config');

exports.init = app => app.use(serve(path.join(root, 'dist'), { maxage: 10 * 24 * 60 * 60 * 1000 }));

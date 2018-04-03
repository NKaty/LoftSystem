const serve = require('koa-static');
const { dist } = require('../config');

exports.init = app => app.use(serve(dist));

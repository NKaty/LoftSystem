const koaBody = require('koa-body');
const { upload } = require('../config');

exports.init = app => app.use(koaBody());

exports.multipart = koaBody(upload);

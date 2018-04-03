const favicon = require('koa-favicon');
const path = require('path');
const { dist } = require('../config');

exports.init = app => app.use(favicon(path.join(dist, 'images', 'favicon.ico')));

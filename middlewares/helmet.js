const helmet = require('koa-helmet');

exports.init = app => app.use(helmet());

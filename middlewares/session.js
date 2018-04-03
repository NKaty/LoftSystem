const koaSession = require('koa-generic-session');
const store = require('../libs/sessionStore');
const { session } = require('../config');
const convert = require('koa-convert');

session.settings.store = store;
exports.init = app => app.use(convert(koaSession(session.settings)));

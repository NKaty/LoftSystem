const redis = require('redis');
const koaRatelimit = require('koa-simple-ratelimit');
const { ratelimit } = require('../config');

ratelimit.db = redis.createClient();
exports.init = app => app.use(koaRatelimit(ratelimit));

const redis = require('redis');
const koaRatelimit = require('koa-simple-ratelimit');
const config = require('../config');

config.ratelimit.db = redis.createClient(config.redis);
exports.init = app => app.use(koaRatelimit(config.ratelimit));

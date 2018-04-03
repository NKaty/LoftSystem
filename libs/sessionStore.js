const MongoStore = require('koa-generic-session-mongo');
const { mongoose } = require('../config');

module.exports = new MongoStore({
  url: mongoose.uri
});

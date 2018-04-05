if (process.env.TRACE) {
  require('./libs/trace');
}

const path = require('path');
const router = require('./routes');
const config = require('./config');
const Koa = require('koa');
const socket = require('./libs/socket');

const app = new Koa();

app.keys = [config.session.secret];

require('./libs/mongoose');

config.middleware.forEach(mw => require(path.join(__dirname, 'middlewares', mw)).init(app));

app.use(router.routes());

module.exports = app;

const server = app.listen(config.server.port, () => console.log(`listening on port ${config.server.port}`));
socket(server);

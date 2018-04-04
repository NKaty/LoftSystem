const socketIO = require('socket.io');
const User = require('../models/user');
const Cookies = require('cookies');
const sessionStore = require('./sessionStore');
const config = require('../config');
const co = require('co');
const socketRedis = require('socket.io-redis');
const { logInfo, logError } = require('./winston')(module);

function socket (server) {
  const io = socketIO(server);
  io.adapter(socketRedis(config.redis));
  io.use(function (socket, next) {
    const handshakeData = socket.request;
    const cookies = new Cookies(handshakeData, {}, config.session.secret);
    const sid = 'koa:sess:' + cookies.get('sid');

    co(function * () {
      let session = yield * sessionStore.get(sid);
      if (!session) {
        socket.disconnect();
        throw new Error('Ваша сессия истекла. Перезайдите в приложение.');
      }
      socket.user = yield User.findById(session.passport.user);
      socket.session = session;
      session.socketIds = session.socketIds ? session.socketIds.concat(socket.id) : [socket.id];
      yield sessionStore.set(sid, session);
      socket.on('disconnect', function () {
        logInfo('clearing');
        co(function * clearSocketId () {
          let session = yield * sessionStore.get(sid, true);
          if (session) {
            session.socketIds.splice(session.socketIds.indexOf(socket.id), 1);
            yield * sessionStore.set(sid, session);
          }
        }).catch(function (err) {
          logError('Session clear error', err);
        });
      });
    }).then(function () {
      next();
    }).catch(function (err) {
      logError(err);
      console.log(err.message);
      next(err);
    });
  });
  const users = {};
  io.on('connection', function (socket) {
    users[socket.id] = {
      username: socket.user.username,
      id: socket.id
    };

    socket.emit('all users', users);

    socket.broadcast.emit('new user', users[socket.id]);

    socket.on('refresh users', function () {
      socket.emit('all users', users);
    });

    socket.on('chat message', function (data, whom) {
      socket.to(whom).emit('chat message', data, socket.id);
    });

    socket.on('disconnect', function () {
      logInfo('disconnected');
      delete users[socket.id];
      socket.broadcast.emit('delete user', socket.id);
      socket.disconnect();
    });

    socket.on('error', (err) => {
      logError(err);
    });
  });
}

const socketEmitter = require('socket.io-emitter');
const redisClient = require('redis').createClient(config.redis);
socket.emitter = socketEmitter(redisClient);

module.exports = socket;

const socket = require('../libs/socket');

exports.post = async function (ctx, next) {
  const id = ctx.state.user._id;
  if (ctx.session.socketIds) {
    ctx.session.socketIds.forEach(function (socketId) {
      socket.emitter.to(socketId).emit('exit');
    });
  }
  ctx.logout();
  ctx.session = null;
  ctx.body = { id: id };
};

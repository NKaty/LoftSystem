const { logInfo, logError } = require('../libs/winston')(module);

exports.init = app => app.use(async (ctx, next) => {
  try {
    await next();
    const status = ctx.status || 404;
    if (status === 404) ctx.throw(404);
  } catch (e) {
    if (e.status) {
      ctx.body = e.message;
      ctx.status = e.status;
      logInfo(e.status, e.message);
    } else {
      ctx.body = 'Error 500';
      ctx.status = 500;
      logError(e.message, e.stack);
    }
  }
});

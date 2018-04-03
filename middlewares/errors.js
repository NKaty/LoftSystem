const { logInfo, logError } = require('../libs/winston')(module);

exports.init = app => app.use(async (ctx, next) => {
  try {
    await next();
    const status = ctx.status || 404;
    if (status === 404) ctx.throw(404);
  } catch (e) {
    if (e.status) {
      ctx.status = e.status;
      ctx.body = { message: e.message };
      logInfo(e.status, e.message);
    } else if (e.name === 'ValidationError') {
      let errorMessages = {};
      for (let key in e.errors) {
        errorMessages[key] = e.errors[key].message;
      }
      ctx.status = 400;
      ctx.body = errorMessages;
      logInfo(e.status, e.message);
    } else if (e.message.slice(0, 20) === 'maxFileSize exceeded') {
      ctx.status = 413;
      ctx.body = { message: 'Превышен максимальный размер файла (2 мегабайта)' };
      logInfo(e.status, e.message);
    } else {
      ctx.status = 500;
      ctx.body = { message: 'Error 500' };
      logError(e.message, e.stack);
    }
  }
});

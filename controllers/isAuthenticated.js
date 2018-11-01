module.exports = async function (ctx, next) {
  if (!ctx.isAuthenticated()) {
    ctx.throw(401, 'Ваша сессия истекла. Перезайдите на сайт.');
  }
  await next();
};

const passport = require('koa-passport');
const uuidv4 = require('uuid/v4');

exports.post = async function (ctx, next) {
  // Так как в реализации фронтенда пользователь может выйти, обновив страницу, и сессия
  // не будет закрыта как надо, проверяем не зависла ли предыдущая сессия
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.session = null;
  }
  await passport.authenticate('local', async function (err, user, info) {
    if (err) {
      throw err;
    }
    if (!user) {
      ctx.throw(400, 'Нет такого пользователя или пароль неверен.');
    }
    if (ctx.request.body.remembered) {
      user.access_token = uuidv4();
      await user.save();
      ctx.cookies.set('access_token', user.access_token, { httpOnly: false, maxAge: 60 * 60 * 4 * 1000 });
    }
    await ctx.login(user);
    user = user.getPublicFields();
    ctx.body = user;
  })(ctx, next);
};

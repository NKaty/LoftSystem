exports.post = async function (ctx, next) {
  ctx.body = ctx.state.user.getPublicFields();
};

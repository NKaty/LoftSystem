const mongoose = require('mongoose');
const Permission = require('../models/permission');
const pick = require('lodash/pick');

exports.checkId = async function (ctx, next) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
    ctx.throw(404);
  }
  ctx.permissionById = await Permission.findById(ctx.params.id);
  if (!ctx.permissionById) {
    ctx.throw(404);
  }
  await next();
};

exports.put = async function (ctx, next) {
  const permissionKeys = Object.keys(pick(ctx.request.body.permission, Permission.clientFields));
  permissionKeys.forEach(key => {
    Object.assign(ctx.permissionById[key], pick(ctx.request.body.permission, Permission.clientFields)[key]);
  });
  await ctx.permissionById.save();
  ctx.body = Object.assign(ctx.permissionById.getPublicFields(), ctx.permissionById.getPermissionId());
};

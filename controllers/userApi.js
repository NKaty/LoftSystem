const mongoose = require('mongoose');
const User = require('../models/user');
const Permission = require('../models/permission');
const pick = require('lodash/pick');
const config = require('../config');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const path = require('path');
const util = require('util');
const { logError } = require('../libs/winston')(module);
const cropImage = require('../util/cropImageSquare');
const compressImage = require('../util/compressImage');

const unlinkPromise = util.promisify(fs.unlink);

exports.get = async function (ctx, next) {
  let users = await User.find({}).populate('permission');
  ctx.body = users.map(user => user.getPublicFields());
};

exports.post = async function (ctx, next) {
  const fields = pick(ctx.request.body, User.clientFields);
  let permission = fields.permission || config.defaultPermission;
  delete fields.permission;
  const user = await User.create(fields);
  await user.save();
  permission = await Permission.create(permission);
  await permission.save();
  user.permission = permission;
  // Причин для генерации здесь токена нет. Но фронтенд реализация хочет его получить - поэтому делаем.
  // Иначе ошибка: “Ошибка сохранения нового пользователя! Проверьте базу данных и токен“
  user.access_token = uuidv4();
  await user.save();
  await ctx.login(user);
  ctx.body = user.getPublicFields();
};

exports.checkId = async function (ctx, next) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
    ctx.throw(404);
  }
  ctx.userById = await User.findById(ctx.params.id).populate('permission');
  if (!ctx.userById) {
    ctx.throw(404);
  }
  await next();
};

exports.checkDir = async function (ctx, next) {
  const upload = config.upload.formidable.uploadDir;
  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }
  await next();
};

exports.postImage = async function (ctx, next) {
  const file = ctx.request.body.files[ctx.params.id];

  if (ctx.is('image/*')) {
    ctx.throw(415, 'Допустимо загружать только файлы в формате image');
  }

  if (file.size === 0) {
    await unlinkPromise(file.path);
    ctx.throw(415, 'Файл для загрузки пуст!');
  }
  const newPath = await compressImage(file.path);
  await cropImage(newPath);
  const dir = newPath.split('/').slice(-2).join('/');
  ctx.body = { path: dir };
};

exports.put = async function (ctx, next) {
  if (ctx.request.body.oldPassword && ctx.request.body.password) {
    if (!ctx.userById.checkPassword(ctx.request.body.oldPassword)) {
      ctx.throw(400, 'Старый пароль неверен.');
      return;
    }
  }

  if (ctx.request.body.image && ctx.userById.image) {
    const oldImage = path.join(config.dist, ctx.userById.image);
    try {
      await unlinkPromise(oldImage);
    } catch (err) {
      if (err.code === 'ENOENT') {
        logError(err);
      } else throw err;
    }
  }

  Object.assign(ctx.userById, pick(ctx.request.body, User.clientFields));
  await ctx.userById.save();
  ctx.body = ctx.userById.getPublicFields();
};

exports.delete = async function (ctx, next) {
  const id = ctx.userById._id;
  await ctx.userById.remove();
  ctx.body = { id: id };
};

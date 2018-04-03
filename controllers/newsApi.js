const mongoose = require('mongoose');
const News = require('../models/news');
const pick = require('lodash/pick');

async function getAllNews () {
  const news = await News.find({}).populate('user');
  return news.map(news => news.getPublicFields());
}

exports.get = async function (ctx, next) {
  ctx.body = await getAllNews();
};

exports.post = async function (ctx, next) {
  const fields = pick(ctx.request.body, News.clientFields);
  fields.user = fields.userId;
  const news = await News.create(fields);
  await news.save();
  ctx.body = await getAllNews(ctx, next);
};

exports.checkId = async function (ctx, next) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
    ctx.throw(404);
  }
  ctx.newsById = await News.findById(ctx.params.id).populate('user');
  if (!ctx.newsById) {
    ctx.throw(404);
  }
  await next();
};

exports.put = async function (ctx, next) {
  const fields = pick(ctx.request.body, News.clientFields);
  fields.user = fields.userId;
  Object.assign(ctx.newsById, fields);
  await ctx.newsById.save();
  ctx.body = await getAllNews(ctx, next);
};

exports.delete = async function (ctx, next) {
  await ctx.newsById.remove();
  ctx.body = await getAllNews(ctx, next);
};

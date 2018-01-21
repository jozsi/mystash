const Router = require('koa-router');
const Category = require('../models/category');

const router = new Router();

router.post('/', async (ctx) => {
  const { body } = ctx.request;
  body.user = ctx.state.user.id;
  const category = await new Category(body).save();
  ctx.body = category;
});

router.get('/', async (ctx) => {
  const categories = await Category.find({ user: ctx.state.user.id });
  ctx.body = categories;
});

module.exports = router;

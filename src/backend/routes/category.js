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

router.put('/:id', async (ctx) => {
  const category = await Category.findOneAndUpdate({
    user: ctx.state.user.id,
    _id: ctx.params.id,
  }, ctx.request.body, { new: true });
  ctx.body = category;
});

router.delete('/:id', async (ctx) => {
  const category = await Category.findOneAndRemove({
    user: ctx.state.user.id,
    _id: ctx.params.id,
  });
  ctx.body = category;
});

module.exports = router;

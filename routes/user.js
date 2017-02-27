const Router = require('koa-router');
const User = require('../models/user');

const router = new Router();

router.post('/', async (ctx) => {
  const user = await new User(ctx.request.body);
  const saved = await user.save();
  ctx.body = saved;
});

router.get('/', async (ctx) => {
  const users = await User.find();
  ctx.body = users;
});

router.get('/:id', async (ctx) => {
  const user = await User.findById(ctx.params.id);
  ctx.body = user;
});

router.put('/:id', async (ctx) => {
  const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body, { new: true });
  ctx.body = user;
});

router.delete('/:id', async (ctx) => {
  const user = await User.findByIdAndRemove(ctx.params.id);
  ctx.body = user;
});

module.exports = router;

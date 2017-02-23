const Router = require('koa-router');
const User = require('../models/user');

const router = new Router();

router.post('/', async (ctx) => {
  const user = await new User(ctx.request.body).save();
  ctx.body = user;
});

router.get('/:id', async (ctx) => {
  const user = await User.findById(ctx.params.id);
  ctx.body = user;
});

module.exports = router;

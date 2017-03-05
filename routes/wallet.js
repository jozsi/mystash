const Router = require('koa-router');
const Wallet = require('../models/wallet');

const router = new Router();

router.post('/', async (ctx) => {
  const wallet = await new Wallet(ctx.request.body).save();
  ctx.body = wallet;
});

router.get('/:id', async (ctx) => {
  const wallet = await Wallet.findOne({
    owner: ctx.state.user.id,
    _id: ctx.params.id,
  });
  ctx.body = wallet;
});

router.put('/:id', async (ctx) => {
  const wallet = await Wallet.findOneAndUpdate({
    owner: ctx.state.user.id,
    _id: ctx.params.id,
  }, ctx.request.body, { new: true });
  ctx.body = wallet;
});

module.exports = router;

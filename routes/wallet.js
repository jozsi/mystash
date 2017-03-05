const Router = require('koa-router');
const Wallet = require('../models/wallet');

const router = new Router();

router.post('/', async (ctx) => {
  const wallet = await new Wallet(ctx.request.body).save();
  ctx.body = wallet;
});

router.get('/', async (ctx) => {
  const wallets = await Wallet.find({ user: ctx.state.user.id });
  ctx.body = wallets;
});

router.get('/:id', async (ctx) => {
  const wallet = await Wallet.findOne({
    user: ctx.state.user.id,
    _id: ctx.params.id,
  });
  ctx.body = wallet;
});

router.put('/:id', async (ctx) => {
  const wallet = await Wallet.findOneAndUpdate({
    user: ctx.state.user.id,
    _id: ctx.params.id,
  }, ctx.request.body, { new: true });
  ctx.body = wallet;
});

module.exports = router;

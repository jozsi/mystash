const Router = require('koa-router');
const Transaction = require('../models/transaction');

const router = new Router();

router.post('/', async (ctx) => {
  const { body } = ctx.request;
  body.user = ctx.state.user.id;
  const transaction = await new Transaction(body).save();
  ctx.body = transaction;
});

router.get('/in/:wallet', async (ctx) => {
  const transactions = await Transaction.find({
    user: ctx.state.user.id,
    wallet: ctx.params.wallet,
  }).sort('-date');
  ctx.body = transactions;
});

router.get('/:id', async (ctx) => {
  const transaction = await Transaction.findOne({
    user: ctx.state.user.id,
    _id: ctx.params.id,
  });
  ctx.body = transaction;
});

router.put('/:id', async (ctx) => {
  const transaction = await Transaction.findOneAndUpdate({
    user: ctx.state.user.id,
    _id: ctx.params.id,
  }, ctx.request.body, { new: true });
  ctx.body = transaction;
});

router.delete('/:id', async (ctx) => {
  const transaction = await Transaction.findOneAndRemove({
    user: ctx.state.user.id,
    _id: ctx.params.id,
  });
  ctx.body = transaction;
});

module.exports = router;

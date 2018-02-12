const Router = require('koa-router');
const Wallet = require('../models/wallet');
const Comparison = require('../content/comparison_to_previous');
const CategoriesClassification = require('../content/category_prediction');

const router = new Router();

router.post('/', async (ctx) => {
  const { body } = ctx.request;
  body.user = ctx.state.user.id;
  const wallet = await new Wallet(body).save();
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
  
  const comparisons = await Comparison.comparison_to_previous_month(wallet);
  const category = await CategoriesClassification.category_prediction(wallet);

  ctx.body = {
    ...wallet.toObject(),
    expense_category: category,
    charts: {
      previous: comparisons.previousMonthRunningExpenses,
      actual: comparisons.runningExpenses,
      forecast: {
        ...comparisons.normalizedForecast,
        forecastMessage: comparisons.userMessage,
      },
    },
  };
});

router.put('/:id', async (ctx) => {
  const wallet = await Wallet.findOneAndUpdate({
    user: ctx.state.user.id,
    _id: ctx.params.id,
  }, ctx.request.body, { new: true });
  ctx.body = wallet;
});

router.delete('/:id', async (ctx) => {
  const wallet = await Wallet.findOne({
    user: ctx.state.user.id,
    _id: ctx.params.id,
  });
  ctx.body = wallet;
});

module.exports = router;

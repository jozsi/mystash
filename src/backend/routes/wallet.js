const moment = require('moment');
const Router = require('koa-router');
const Wallet = require('../models/wallet');
const Calendar = require('../factories/calendar');
const DataPrep = require('../factories/data_prep');
const Prediction = require('../factories/predictions');
const Transaction = require('../factories/transactions');

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
  // This month
  const expenses = await Transaction.getCurrentMonthAggregatedByDay(wallet);
  const prepared_data = DataPrep.addNumericalIndexes(expenses);
  const daysLeft = Calendar.daysLeftInMonth();
  const today = moment().format('D');
  const forecast = Prediction.predict(
    prepared_data['indexes'], prepared_data['values'], daysLeft,
    parseInt(today, 10) + 1
  );

  // Previous month
  const previousExpenses = await Transaction.getDataAggregatedByDay(
    wallet, Calendar.getFirstDayOfPreviousMonth(), Calendar.getLastDayOfPreviousMonth());

  ctx.body = wallet;
  ctx.actual = prepared_data['values'];
  // Jozsi, the forecast is currently in the following format
  // [[1, 2], [2, 2], [3, 5], ..., [x(i), y(i)]] 
  // How would you prefer me to arrange them in order to display them on a graph
  ctx.forecast = forecast;
  ctx.previous = previousExpenses;
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

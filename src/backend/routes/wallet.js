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
  // Current month
  const expenses = await Transaction.getCurrentMonthAggregatedByDay(wallet);
  const prepared_data = DataPrep.addNumericalIndexes(expenses);
  const daysLeft = Calendar.daysLeftInMonth();
  const runningExpenses = DataPrep.createRunningTotal(prepared_data, Calendar.dayOfMonth());

  // Current month forecast
  const today = parseInt(moment().format('D'), 10);
  const forecast = Prediction.predict(
    runningExpenses.day, runningExpenses.runningTotal, daysLeft, today + 1
  );
  const normalizedForecast = DataPrep.normalizeTimeseries(forecast, Calendar.daysInMonth());

  // Previous month
  const previousMonthExpenses = await Transaction.getDataAggregatedByDay(
    wallet, Calendar.getFirstDayOfPreviousMonth(true), Calendar.getLastDayOfPreviousMonth(true));
  const previousMonthExpensesIndexed = DataPrep.addNumericalIndexes(previousMonthExpenses);
  const daysInPreviousMonth = Calendar.daysInMonth(Calendar.getFirstDayOfPreviousMonth());
  const previousMonthRunningExpenses = DataPrep.createRunningTotal(previousMonthExpensesIndexed, daysInPreviousMonth);
  

  ctx.body = wallet;
  ctx.actual = runningExpenses;
  ctx.forecast = normalizedForecast;
  ctx.previous = previousMonthRunningExpenses;
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

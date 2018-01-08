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

  // Todo: Move this to an external file
  // Get end of month values
  let currentMonthTotal = 0;
  let message = {};
  // Todo: Handle the case where no prediction available (no actual datapoints either)
  // Todo: Handle the case when we don't have previous data
  if (daysLeft > 0) {
    // We're looking at last day of prediction
    currentMonthTotal = normalizedForecast.runningTotal.slice(-1)[0];
    // Todo: Use an (html?) templating library for this
    message = {
      save: "Great job! You're on track to save {0} vs last month.",
      equal: "It looks like you're gonna be spending about the same as last month.",
      exceed: "Careful! If you don't change your expenses, you're going to spend {0} more than last month."
    };
  } else {
    currentMonthTotal = runningExpenses.runningTotal.slice(-1)[0];
    message = {
      save: "Great job! You're saving {0} vs last month.",
      equal: "It looks like you've spending about the same as last month.",
      exceed: "Uh-oh, looks like you've spent {0} more than last month."
    };
  }
  let previousMonthTotal = previousMonthRunningExpenses.runningTotal.slice(-1)[0];

  let userMessage;
  console.log(previousMonthTotal, currentMonthTotal);
  // Todo: Make this an aproximation instead of strict comparison (i.e. $0.01 is not really saving)
  if (currentMonthTotal < previousMonthTotal) {
    userMessage = message.save;
  } else if (currentMonthTotal > previousMonthTotal) {
    userMessage = message.exceed;
  } else {
    userMessage = message.equal;
  }

  const re = new RegExp("\\{0\\}", "g");
  userMessage = userMessage.replace(re, (currentMonthTotal - previousMonthTotal))

  ctx.body = {
    ...wallet.toObject(),
    charts: {
      previous: previousMonthRunningExpenses,
      actual: runningExpenses,
      forecast: {
        ...normalizedForecast,
        forecastMessage: userMessage,
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

const moment = require('moment');
const Calendar = require('../factories/calendar');
const DataPrep = require('../factories/data_prep');
const Prediction = require('../factories/predictions');
const Transaction = require('../factories/transactions');

const comparison = {};

comparison.comparison_to_previous_month = async function(wallet) {
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

  const userMessage = comparison.comparison_message(daysLeft, normalizedForecast, runningExpenses, previousMonthRunningExpenses);

  return {
    previousMonthRunningExpenses: previousMonthRunningExpenses,
    runningExpenses: runningExpenses,
    normalizedForecast: normalizedForecast,
    userMessage: userMessage
  }
}

comparison.comparison_message = function(daysLeft, normalizedForecast, runningExpenses, previousMonthRunningExpenses) {
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

  return userMessage;
}

module.exports = comparison;

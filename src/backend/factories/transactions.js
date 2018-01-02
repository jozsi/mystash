const Transaction = require('../models/transaction');
const Calendar = require('../factories/calendar');

const transaction = {};

transaction.getForDates = async function(wallet, startDate, endDate) {
  const transactions = await Transaction.find(
    { 
      wallet: wallet.id, 
      $and: [
        {date: {$gte: startDate}},
        {date: {$lte: endDate}}
      ]
    })  
    .sort({date: 1});

  return transactions;
};

transaction.getCurrentMonthAggregatedByDay = async function(wallet) {
  const firstDay = Calendar.getFirstDayOfMonth();
  const lastDay = Calendar.getCurrentDate();

  return await transaction.getDataAggregatedByDay(wallet, firstDay, lastDay);
}

transaction.getDataAggregatedByDay = async function(wallet, startDate, endDate) {
  let out = {};
  out.map = function() { emit(this.date, this.amount) };
  out.reduce = function(k, vals) { return vals.reduce((a, b) => a + b, 0) };
  out.out = { inline: 1 };
  out.query = { 
    wallet: wallet.id, 
    $and: [
      {date: {$gte: startDate}},
      {date: {$lte: endDate}}
    ]
  };

  const expenses = await Transaction.mapReduce(out, function(err, model, stats) {
  });

  return expenses;
};
  
  
module.exports = transaction;

const moment = require('moment');
const Calendar = require('../factories/calendar');
const Transaction = require('../factories/transactions');
const data_prep = require('../factories/knn_data_prep');
const KNN = require('../factories/classification');

const category = {};

const MOTNHS_FOR_TRAINING = 6;

category.category_prediction = async function(wallet) {
  const startDate = Calendar.formatted(moment().startOf('month').subtract(MOTNHS_FOR_TRAINING, 'month'));
  const today = Calendar.getCurrentDate();
  const transactions = await Transaction.getForDates(wallet, startDate, today);

  const features = data_prep.fitTransactionsForKnn(transactions);
  const target = {
    paramA: Calendar.dayOfMonth(moment()),
    paramB: 0,
    type: false
  };
  return KNN.predict(features, target);
};

module.exports = category;

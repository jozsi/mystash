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
    const transactions = Transaction.getForDates(startDate, today);

    const features = data_prep.fitTransactionsForKnn(transactions);
    return KNN.predict(features, Calendar.dayOfMonth(moment(), false));
};

module.exports = category;

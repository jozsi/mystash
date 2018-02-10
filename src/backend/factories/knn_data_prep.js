const moment = require('moment');

const knn_data_prep = {};

knn_data_prep.fitTransactionsForKnn = function(transactions, usePrice=false) {
  let features = [];

  for (let i in transactions) {
    const transaction = transactions[i];
    let feature = {
      paramA: moment(transaction.date).format('D'),
      paramB: transaction.amount > 0 ? 'income' : 'expense',
      type: transaction.categories[0]
    };

    if (usePrice) {
      feature.paramC = transaction.amount;
    }

    features.push(feature);
  }

  return features;
};

module.exports = knn_data_prep;

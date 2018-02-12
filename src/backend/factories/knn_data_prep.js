const moment = require('moment');

const knn_data_prep = {};


knn_data_prep.category_ids = {};

knn_data_prep.fitTransactionsForKnn = function(transactions, usePrice=false) {
  let features = [];

  let paramMapping = {};
  for (let i in transactions) {
    const transaction = transactions[i];

    if (transaction.categories[0] === undefined) {
      continue;
    }
    
    let feature = {
      paramA: getMapping(paramMapping, 'paramA', moment(transaction.date).format('D')),
      paramB: getMapping(paramMapping, 'paramB', transaction.amount > 0 ? 'income' : 'expense'),
      type: String(transaction.categories[0])
    };

    if (usePrice) {
      feature.paramC = transaction.amount;
    }

    features.push(feature);
  }

  return features;
};

const getMapping = function(source, category, value) {
  source[category] = source[category] || {};

  if (source[category][value] === undefined) {
    source[category][value] = Object.keys(source[category]).length;
  }
  
  return source[category][value];
};

module.exports = knn_data_prep;

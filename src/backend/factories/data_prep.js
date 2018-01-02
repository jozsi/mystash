const moment = require('moment');

const data_prep = {};

data_prep.addNumericalIndexes = function(items) {
  let indexes = [];
  let values = [];

  console.log('_');
  console.log(items);
  
  for (let i in items) {
    const item = items[i];
    indexes.push(moment(item['_id']).format('D'));
    values.push(item['value']);
  }

  return {
    'indexes': indexes,
    'values': values
  };
};

module.exports = data_prep;

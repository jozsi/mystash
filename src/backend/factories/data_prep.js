const moment = require('moment');

const data_prep = {};

data_prep.addNumericalIndexes = function(items) {
  let indexes = [];
  let values = [];
  
  for (let i in items) {
    const item = items[i];
    indexes.push(parseInt(moment(item['_id']).format('D'), 10));
    values.push(item['value']);
  }

  return {
    'indexes': indexes,
    'values': values
  };
};

data_prep.normalizeTimeseries = function(timeseries, length) {
  // Takes a timeseries of the form 
  // Fills in missing index values with NULL
  
  let normalized = Array.apply(null, {length: length});
  let indexes = Array.apply(null, {length: length})
    .map(function (x, i) { return i + 1; });
  
  for (let i = 0, arrayLength = timeseries.length; i < arrayLength; i++) {
    let item = timeseries[i];
    normalized[item[0]] = item[1];
  }

  return {
    day: indexes,
    runningTotal: normalized
  }
};

data_prep.createRunningTotal = function(series, maxLength) {
  // Takes a pair of arrays of the form {a: [1, 2, 3], b: [x, y, z]}
  // and creates a running total for each day up to maxLength. If days
  // are missing, their value is considered 0
  let values = {};
  for (let i = 0; i < series.indexes.length; i++) {
    values[series.indexes[i]] = series.values[i];
  }

  let indexes = [], totals = [];
  for (let i = 0; i < maxLength; i++) {
    indexes.push(i + 1);
    let currentValue = 0 + (totals[i - 1] || 0) + (values[i + 1] || 0);
    totals.push(currentValue);
  }

  return {
    day: indexes,
    runningTotal: totals
  }
};

module.exports = data_prep;

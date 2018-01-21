const DATA = require('./data_prep.json');
const DataPrep = require('../factories/data_prep');

test('numerical indexes correctly added', () => {
  const indexData = DataPrep.addNumericalIndexes(DATA.aggregated_data);
  expect(indexData).toHaveProperty('indexes');
  expect(indexData).toHaveProperty('values');
  expect(indexData.indexes).toHaveLength(DATA.aggregated_data.length);
  expect(indexData.values).toHaveLength(DATA.aggregated_data.length);
});

test('timeseries normalization length correct', () => {
  const missingValues = Math.floor(Math.random() * 31);
  const arrayLength = missingValues + DATA.timeseries.length;
  const normalized = DataPrep.normalizeTimeseries(DATA.timeseries, arrayLength);
  expect(normalized.runningTotal).toHaveLength(arrayLength);
});

test('timeseries normalization missing values', () => {
  const missingValues = Math.floor(Math.random() * 31);
  const arrayLength = missingValues + DATA.timeseries.length;
  const normalized = DataPrep.normalizeTimeseries(DATA.timeseries, arrayLength);
  let nullCount = 0;
  for (let i = 0, arrayLength = normalized.runningTotal.length; i < arrayLength; i++) {
    if (normalized.runningTotal[i] === undefined) {
      nullCount += 1;
    }
  }
  expect(nullCount).toBe(missingValues);
});

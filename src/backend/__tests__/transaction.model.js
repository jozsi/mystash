const omit = require('object.omit');
const DATA = require('./transaction.json');
const Transaction = require('../models/transaction');

describe('Transaction', () => {
  const expectError = async (key, value) => {
    const testData = omit(DATA, key);
    if (value !== undefined) {
      testData[key] = value;
    }
    const transaction = new Transaction(testData);
    expect.assertions(1);
    try {
      await transaction.validate();
    } catch (err) {
      expect(err.errors[key]).toBeDefined();
    }
  };

  it('should expose _id as id', async () => {
    const transaction = new Transaction(DATA);
    const transformed = transaction.toObject();
    expect(transformed._id).toBeUndefined(); // eslint-disable-line no-underscore-dangle
    expect(transformed.id)
      .toBe(transaction._id.toString()); // eslint-disable-line no-underscore-dangle
  });

  it('should not expose __v', async () => {
    const transaction = new Transaction(DATA).toObject();
    expect(transaction.__v).toBeUndefined(); // eslint-disable-line no-underscore-dangle
  });

  it('should throw error if amount is missing', async () => {
    await expectError('amount');
  });

  it('should throw error if user is missing', async () => {
    await expectError('user');
  });

  it('should throw error if wallet is missing', async () => {
    await expectError('wallet');
  });

  it('should be valid', async () => {
    const transaction = new Transaction(DATA);
    const errors = await transaction.validate();
    expect(errors).toBeUndefined();
  });

  it('should default details to empty string', async () => {
    const transaction = new Transaction(omit(DATA, 'details'));
    expect(transaction.details).toBe('');
  });

  it('should default date to now', async () => {
    const now = Date.now();
    const transaction = new Transaction(omit(DATA, 'date'));
    const TOLERANCE = 1000;
    expect(Math.abs(transaction.date.getTime() - now)).toBeLessThan(TOLERANCE);
  });
});

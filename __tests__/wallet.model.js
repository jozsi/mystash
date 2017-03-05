const omit = require('object.omit');
const DATA = require('./wallet.json');
const Wallet = require('../models/wallet');

describe('Wallet', () => {
  const expectError = async (key, value) => {
    const testData = omit(DATA, key);
    if (value !== undefined) {
      testData[key] = value;
    }
    const user = new Wallet(testData);
    expect.assertions(1);
    try {
      await user.validate();
    } catch (err) {
      expect(err.errors[key]).toBeDefined();
    }
  };

  it('should expose _id as id', async () => {
    const wallet = new Wallet(DATA);
    const transformed = wallet.toObject();
    expect(transformed._id).toBeUndefined();  // eslint-disable-line no-underscore-dangle
    expect(transformed.id).toBe(wallet._id.toString());  // eslint-disable-line no-underscore-dangle
  });

  it('should not expose __v', async () => {
    const wallet = new Wallet(DATA).toObject();
    expect(wallet.__v).toBeUndefined();  // eslint-disable-line no-underscore-dangle
  });

  it('should throw error if name is missing', async () => {
    await expectError('name');
  });

  it('should throw error if name is empty', async () => {
    await expectError('name', ' ');
  });

  it('should be valid', async () => {
    const wallet = new Wallet(DATA);
    const errors = await wallet.validate();
    expect(errors).toBeUndefined();
  });

  it('should default currency to USD', async () => {
    const wallet = new Wallet(omit(DATA, 'currency'));
    expect(wallet.currency).toBe('USD');
  });

  it('should should if currency is invalid', async () => {
    await expectError('currency', 'LOL');
  });

  it('should default value to 0', async () => {
    const wallet = new Wallet(omit(DATA, 'value'));
    expect(wallet.value).toBe(0);
  });

  it('should format value', async () => {
    const wallet = new Wallet(DATA);
    expect(wallet.formattedValue).toBe(`${DATA.value},00 €`);  // eslint-disable-line no-irregular-whitespace
  });
});

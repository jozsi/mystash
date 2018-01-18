const omit = require('object.omit');
const DATA = require('./user.json');
const User = require('../models/user');

describe('User', () => {
  const expectError = async (key, value) => {
    const testData = omit(DATA, key);
    if (value !== undefined) {
      testData[key] = value;
    }
    const user = new User(testData);
    expect.assertions(1);
    try {
      await user.validate();
    } catch (err) {
      expect(err.errors[key]).toBeDefined();
    }
  };

  beforeAll(() => {
    User.prototype.collection.insert = (docs, options, callback) => callback(null, docs);
  });

  it('should expose _id as id', async () => {
    const user = new User(DATA);
    const transformed = user.toObject();
    expect(transformed._id).toBeUndefined(); // eslint-disable-line no-underscore-dangle
    expect(transformed.id).toBe(user._id.toString()); // eslint-disable-line no-underscore-dangle
  });

  it('should throw error if email is missing', async () => {
    await expectError('email');
  });

  it('should throw error if email is invalid', async () => {
    await expectError('email', 'I am not an email address');
  });

  it('should lowercase the email field', () => {
    const user = new User(DATA);
    expect(user.email).toBe(DATA.email.toLowerCase());
  });

  it('should throw error if password is missing', async () => {
    await expectError('password');
  });

  it('should throw error if password is empty', async () => {
    await expectError('password', ' ');
  });

  it('should hash password', async () => {
    const user = new User(DATA);
    await user.save();
    expect(user.password).not.toEqual(DATA.password);
  });

  it('should compare hashed passwords', async () => {
    const user = new User(DATA);
    await user.save();
    const comparison = await user.comparePassword(DATA.password);
    expect(comparison).toEqual(true);
  });

  it('should not expose password', async () => {
    const user = new User(DATA).toObject();
    expect(user.password).toBeUndefined();
  });

  it('should throw error if firstName is missing', async () => {
    await expectError('firstName');
  });

  it('should throw error if firstName is empty', async () => {
    await expectError('firstName', ' ');
  });

  it('should throw error if lastName is missing', async () => {
    await expectError('lastName');
  });

  it('should throw error if lastName is empty', async () => {
    await expectError('lastName', ' ');
  });

  it('should not expose __v', async () => {
    const user = new User(DATA).toObject();
    expect(user.__v).toBeUndefined(); // eslint-disable-line no-underscore-dangle
  });

  it('should be valid', async () => {
    const user = new User(DATA);
    const result = await user.validate();
    expect(result).toBe(user);
  });
});

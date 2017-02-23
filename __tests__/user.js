const omit = require('object.omit');
const DATA = require('./factories').user;
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
    await user.preSave();
    expect(user.password).not.toEqual(DATA.password);
  });

  it('should compare hashed passwords', async () => {
    const user = new User(DATA);
    await user.preSave();
    const comparison = await user.comparePassword(DATA.password);
    expect(comparison).toEqual(true);
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

  it('should be valid', async () => {
    const user = new User(DATA);
    const errors = await user.validate();
    expect(errors).toBeUndefined();
  });
});

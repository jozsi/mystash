const omit = require('object.omit');
const User = require('../models/user');

describe('User', () => {
  const data = Object.freeze({
    email: 'git@jozsi.ro',
    password: 'H3110',
    firstName: 'Jozsi',
    lastName: 'Gergely',
  });

  const expectError = async (key, value) => {
    const testData = omit(data, key);
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

  it('should throw error if password is missing', async () => {
    await expectError('password');
  });

  it('should throw error if password is empty', async () => {
    await expectError('password', ' ');
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
    const user = new User(data);
    const errors = await user.validate();
    expect(errors).toBeUndefined();
  });
});

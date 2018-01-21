const omit = require('object.omit');
const DATA = require('./category.json');
const Category = require('../models/category');

describe('Category', () => {
  const expectError = async (key, value) => {
    const testData = omit(DATA, key);
    if (value !== undefined) {
      testData[key] = value;
    }
    const category = new Category(testData);
    expect.assertions(1);
    try {
      await category.validate();
    } catch (err) {
      expect(err.errors[key]).toBeDefined();
    }
  };

  it('should expose _id as id', async () => {
    const category = new Category(DATA);
    const transformed = category.toObject();
    expect(transformed._id).toBeUndefined(); // eslint-disable-line no-underscore-dangle
    expect(transformed.id)
      .toBe(category._id.toString()); // eslint-disable-line no-underscore-dangle
  });

  it('should not expose __v', async () => {
    const category = new Category(DATA).toObject();
    expect(category.__v).toBeUndefined(); // eslint-disable-line no-underscore-dangle
  });

  it('should throw error if name is missing', async () => {
    await expectError('name');
  });

  it('should throw error if user is missing', async () => {
    await expectError('user');
  });

  it('should be valid', async () => {
    const category = new Category(DATA);
    const errors = await category.validate();
    expect(errors).toBeUndefined();
  });

  it('should default color to #cccccc', async () => {
    const category = new Category(omit(DATA, 'color'));
    expect(category.color).toBe('#cccccc');
  });
});

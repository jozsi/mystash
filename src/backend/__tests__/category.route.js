const omit = require('object.omit');
const supertest = require('supertest');
const DATA = require('./category.json');
const USER = require('./user.json');
const app = require('../app');
const db = require('../db');
const defaultCategories = require('../factories/categories');
const Category = require('../models/category');
const User = require('../models/user');


const ROUTE = '/category';

describe('category', () => {
  let server;
  let request;
  let categories = [];
  let user;

  function createCategory(data) {
    return request
      .post(ROUTE)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        ...data,
        user: user.id,
      });
  }

  beforeAll(async () => {
    await db.connect(process.env.TEST_DB_URI);
    await Category.remove({});
    await User.remove({});
    user = await User.create(USER);
    server = app.listen();
    request = supertest(server);
  });

  it('should create default categories for user', async () => {
    const response = await request
      .get(`${ROUTE}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200);
    expect(response.body.map(x => omit(x, 'id')))
      .toEqual(defaultCategories.map(x => ({ ...x, user: user._id.toString() })));
    categories = response.body;
  });

  it('should create a category', async () => {
    const response = await createCategory(DATA)
      .expect(200);
    const category = response.body;
    expect(category.id).toHaveLength(24);
    categories.push(category);
  });

  it('should read categories', async () => {
    await request
      .get(`${ROUTE}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200)
      .expect(categories);
  });

  afterAll(async () => {
    server.close();
    await db.disconnect();
  });
});

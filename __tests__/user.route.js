const supertest = require('supertest');
const DATA = require('./user.json');
const app = require('../app');
const CONFIG = require('../config');
const db = require('../db');
const User = require('../models/user');

const ROUTE = '/user';

describe('user', () => {
  let server;
  let request;
  let user;

  beforeAll(async () => {
    await db.connect(CONFIG.TEST_DB_URI);
    await User.remove({});
    server = app.listen();
    request = supertest(server);
  });

  it('should create a user', async () => {
    const response = await request
      .post(ROUTE)
      .send(DATA)
      .expect(200);
    user = response.body;
    expect(user.id).toHaveLength(24);
  });

  it('should error creation if user already exists', async () => {
    await request
      .post(ROUTE)
      .send(DATA)
      .expect(500);
  });

  it('should login a valid user', async () => {
    const { email, password } = DATA;
    await request
      .post(`${ROUTE}/login`)
      .send({ email, password })
      .expect(200)
      .expect(user);
  });

  it('should reject an invalid password', async () => {
    const { email } = DATA;
    await request
      .post(`${ROUTE}/login`)
      .send({ email, password: 'wrong password' })
      .expect(401);
  });

  it('should reject an inexisting user', async () => {
    const { password } = DATA;
    await request
      .post(`${ROUTE}/login`)
      .send({ email: 'ET@calling.eath', password })
      .expect(404);
  });

  it('should read user', async () => {
    await request
      .get(ROUTE)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200)
      .expect(user);
  });

  it('should require authorization to read', async () => {
    await request
      .get(ROUTE)
      .expect(401);
  });

  it('should update user', async () => {
    const updatedUser = Object.assign({}, user, { lastName: 'Roe' });
    await request
      .put(ROUTE)
      .set('Authorization', `Bearer ${user.token}`)
      .send(updatedUser)
      .expect(200)
      .expect(updatedUser);
  });

  it('should require authorization to update', async () => {
    await request
      .put(ROUTE)
      .expect(401);
  });

  afterAll(async () => {
    server.close();
    await db.disconnect();
  });
});

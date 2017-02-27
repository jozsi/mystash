const supertest = require('supertest');
const DATA = require('./user.json');
const app = require('../app');
const CONFIG = require('../config');
const db = require('../db');
const User = require('../models/user');
const router = require('../routes/user');

describe('user', () => {
  let server;
  let request;
  const list = [];

  beforeAll(async () => {
    await db.connect(CONFIG.TEST_DB_URI);
    await User.remove({});
    app.use(router.routes());
    server = app.listen();
    request = supertest(server);
  });

  it('should create a user', async () => {
    const response = await request
      .post('/')
      .send(DATA)
      .expect(200);
    const user = response.body;
    expect(user.id).toHaveLength(24);
    list.push(user);
  });

  // TODO: mongoose doesn't seem to create the unique index on the `email` field when running tests
  // it('should error if user already exists', async () => {
  //   await request
  //     .post('/')
  //     .send(DATA)
  //     .expect(500);
  // });

  it('should read all users', async () => {
    const response = await request
      .get('/')
      .expect(200);
    expect(response.body).toEqual(list);
  });

  it('should read a user', async () => {
    const user = list[0];
    const response = await request
      .get(`/${user.id}`)
      .expect(200);
    expect(response.body).toEqual(user);
  });

  it('should update a user', async () => {
    const user = list[0];
    user.lastName = 'Roe';
    const response = await request
      .put(`/${user.id}`)
      .send(user)
      .expect(200);
    expect(response.body).toEqual(user);
  });

  it('should delete a user', async () => {
    const user = list[0];
    const response = await request
      .delete(`/${user.id}`)
      .expect(200);
    expect(response.body).toEqual(user);
    const listResponse = await request.get('/');
    expect(listResponse.body).toEqual([]);
  });

  afterAll(async () => {
    server.close();
    await db.disconnect();
  });
});

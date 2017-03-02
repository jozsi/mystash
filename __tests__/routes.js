const supertest = require('supertest');
const USER = require('./user.json');
const app = require('../app');
const { TEST_DB_URI } = require('../config');
const db = require('../db');
const router = require('../routes');

describe('routes', () => {
  let server;
  let request;
  let user;

  beforeAll(async () => {
    await db.connect(TEST_DB_URI);
    app.use(router.routes());
    server = app.listen();
    request = supertest(server);
  });

  it('should not protect POST /user', async () => {
    const response = await request
      .post('/user')
      .send(Object.assign({}, USER, { email: `John+${Date.now()}@doe.ro` }))
      .expect(200);
    user = response.body;
  });

  it('should protect GET /user', async () => {
    await request
      .get(`/user/${user.id}`)
      .expect(401);
  });

  it('should allow GET /user with valid JWT', async () => {
    const response = await request
      .get(`/user/${user.id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200);
    expect(response.body).toEqual(user);
  });

  afterAll(async () => {
    server.close();
    await db.disconnect();
  });
});

// TODO: heavily WiP
const supertest = require('supertest');
const DATA = require('./factories').user;
const app = require('../app');
const CONFIG = require('../config');
const db = require('../db');
const users = require('../routes/users');

describe('user', () => {
  let server;
  let request;

  beforeAll(async () => {
    await db.connect(CONFIG.DB_URI);
    server = app.listen(() => app.use(users.routes()));
    request = supertest(server);
  });

  it('should POST /', async () => {
    const response = await request.post('/').send(DATA);
    console.log('Response is', response.text);
  });

  afterAll(() => {
    server.close();
  });
});

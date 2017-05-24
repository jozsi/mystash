const supertest = require('supertest');
const app = require('../app');

const ROUTE = '/';

describe('home', () => {
  let server;
  let request;

  beforeAll(() => {
    server = app.listen();
    request = supertest(server);
  });

  it('should contain this route in list', async () => {
    const result = await request.get(ROUTE);
    expect(result.body).toEqual(expect.arrayContaining([`GET ${ROUTE}`]));
  });

  afterAll(() => {
    server.close();
  });
});

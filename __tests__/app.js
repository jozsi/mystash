const supertest = require('supertest');
const app = require('../app');

describe('app', () => {
  let server;
  let request;

  it('should instantiate', () => {
    expect(app).not.toBe(undefined);
  });

  it('should start server', () => {
    server = app.listen();
    request = supertest(server);
  });

  it('should say "Hello World"', async () => {
    const response = await request.get('/');
    expect(response.text).toBe('Hello World');
  });

  it('should shutdown server', () => {
    server.close();
  });
});

const request = require('supertest');
const app = require('../app');

describe('Express Server', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(0, done); // Start on random port
  });

  afterAll((done) => {
    server.close(done); // Proper cleanup
  });

  test('GET / serves index.html', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('<title>Hello World Express</title>');
  });

  test('GET /api/text returns plain text', async () => {
    const response = await request(server).get('/api/text');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World');
    expect(response.headers['content-type']).toMatch(/text/);
  });

  test('GET /api/hello returns JSON', async () => {
    const response = await request(server).get('/api/hello');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello World' });
    expect(response.headers['content-type']).toMatch(/json/);
  });
});
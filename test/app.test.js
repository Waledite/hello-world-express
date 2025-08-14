const request = require('supertest');
const { app } = require('../app');

describe('GET /', () => {
  it('should serve the index.html file', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('<title>Hello World Express</title>');
  });
});

describe('GET /api/text', () => {
  it('should return "Hello World" as text', async () => {
    const response = await request(app).get('/api/text');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello World');
  });
});

describe('GET /api/hello', () => {
  it('should return "Hello World" as JSON', async () => {
    const response = await request(app).get('/api/hello');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Hello World' });
  });
});
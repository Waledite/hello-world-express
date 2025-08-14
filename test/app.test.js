const request = require('supertest');
const app = require('../app');

// Add server closing logic
let server;

beforeAll(() => {
  server = app.listen(0); // Start server on random port for tests
});

afterAll((done) => {
  server.close(done); // Close server after tests
});

describe('GET /', () => {
  it('should serve the index.html file', async () => {
    const response = await request(server).get('/'); // Use server instead of app
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('<title>Hello World Express</title>');
  });
});

// Update other tests to use server instead of app
describe('GET /api/text', () => {
  it('should return "Hello World" as text', async () => {
    const response = await request(server).get('/api/text'); // Changed to server
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello World');
  });
});

describe('GET /api/hello', () => {
  it('should return "Hello World" as JSON', async () => {
    const response = await request(server).get('/api/hello'); // Changed to server
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Hello World' });
  });
});
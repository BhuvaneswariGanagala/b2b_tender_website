const request = require('supertest');
const app = require('./src/server');

describe('Tender Management API', () => {
  test('Health check endpoint', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
  });

  test('404 for unknown routes', async () => {
    const response = await request(app).get('/api/unknown');
    expect(response.status).toBe(404);
  });

  test('Auth routes are accessible', async () => {
    const response = await request(app).post('/api/auth/login');
    expect(response.status).toBe(400); // Should fail validation, not 404
  });

  test('Protected routes require authentication', async () => {
    const response = await request(app).get('/api/companies');
    expect(response.status).toBe(401); // Should require auth
  });
}); 
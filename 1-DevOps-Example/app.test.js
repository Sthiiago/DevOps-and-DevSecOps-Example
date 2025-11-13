const request = require('supertest');
const app = require('./app');

describe('DevOps Demo App - Tests', () => {
  
  test('GET / - Debe retornar mensaje de bienvenida', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('DevOps');
  });

  test('GET /health - Debe retornar status OK', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('OK');
  });

  test('GET /api/users - Debe retornar lista de usuarios', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('POST /api/calculate - Suma correcta', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ operation: 'add', a: 5, b: 3 });
    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(8);
  });

  test('POST /api/calculate - Multiplicación correcta', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ operation: 'multiply', a: 4, b: 5 });
    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(20);
  });

  test('POST /api/calculate - División por cero', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ operation: 'divide', a: 10, b: 0 });
    expect(response.statusCode).toBe(200);
    expect(response.body.result).toContain('Error');
  });

  test('POST /api/calculate - Operación inválida', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ operation: 'invalid', a: 1, b: 2 });
    expect(response.statusCode).toBe(400);
  });
});

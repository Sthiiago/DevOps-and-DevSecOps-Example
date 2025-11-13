const request = require('supertest');
const app = require('./app');

describe('DevSecOps Demo App - Security Tests', () => {

  // ============================================
  // TESTS DE RUTAS PÚBLICAS
  // ============================================
  
  test('GET / - Debe retornar información de seguridad', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body.security).toBe('enabled');
  });

  test('GET /health - Debe retornar status OK', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('OK');
  });

  // ============================================
  // TESTS DE AUTENTICACIÓN
  // ============================================

  test('POST /api/login - Login exitoso con credenciales válidas', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        username: 'admin',
        password: 'Admin123!'
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('POST /api/login - Debe fallar con credenciales inválidas', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        username: 'admin',
        password: 'wrongpassword'
      });
    
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  test('POST /api/login - Debe validar entrada (username muy corto)', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        username: 'ab',
        password: 'password123'
      });
    
    expect(response.statusCode).toBe(400);
  });

  test('POST /api/login - Debe validar entrada (password muy corto)', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        username: 'testuser',
        password: '12345'
      });
    
    expect(response.statusCode).toBe(400);
  });

  // ============================================
  // TESTS DE AUTORIZACIÓN
  // ============================================

  test('GET /api/secure/profile - Debe denegar acceso sin token', async () => {
    const response = await request(app)
      .get('/api/secure/profile');
    
    expect(response.statusCode).toBe(401);
  });

  test('GET /api/secure/profile - Debe denegar acceso con token inválido', async () => {
    const response = await request(app)
      .get('/api/secure/profile')
      .set('Authorization', 'Bearer invalid-token');
    
    expect(response.statusCode).toBe(403);
  });

  test('GET /api/secure/profile - Debe permitir acceso con token válido', async () => {
    // Primero obtener token
    const loginResponse = await request(app)
      .post('/api/login')
      .send({
        username: 'admin',
        password: 'Admin123!'
      });
    
    const token = loginResponse.body.token;

    // Luego acceder a ruta protegida
    const response = await request(app)
      .get('/api/secure/profile')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.user.username).toBe('admin');
  });

  // ============================================
  // TESTS DE VALIDACIÓN DE ENTRADA
  // ============================================

  test('POST /api/secure/data - Debe validar entrada', async () => {
    // Primero obtener token
    const loginResponse = await request(app)
      .post('/api/login')
      .send({
        username: 'admin',
        password: 'Admin123!'
      });
    
    const token = loginResponse.body.token;

    // Test con entrada vacía
    const response = await request(app)
      .post('/api/secure/data')
      .set('Authorization', `Bearer ${token}`)
      .send({ data: '' });
    
    expect(response.statusCode).toBe(400);
  });

  // ============================================
  // TESTS DE SEGURIDAD
  // ============================================

  test('Security Headers - Debe incluir headers de seguridad', async () => {
    const response = await request(app).get('/');
    
    // Helmet agrega estos headers
    expect(response.headers).toHaveProperty('x-content-type-options');
    expect(response.headers).toHaveProperty('x-frame-options');
  });

  test('GET /api/security-info - Debe retornar información de seguridad', async () => {
    const response = await request(app).get('/api/security-info');
    
    expect(response.statusCode).toBe(200);
    expect(response.body.security_measures).toHaveProperty('helmet');
    expect(response.body.security_measures.helmet).toBe('enabled');
  });

  test('404 Handler - Debe manejar rutas no existentes', async () => {
    const response = await request(app).get('/ruta-no-existe');
    expect(response.statusCode).toBe(404);
  });
});

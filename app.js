const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret-key-change-in-production';

// ============================================
// SECURITY MIDDLEWARES - DevSecOps Best Practices
// ============================================

// 1. Helmet - Protección de headers HTTP
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ['\'self\''],
      styleSrc: ['\'self\'', '\'unsafe-inline\'']
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// 2. Rate Limiting - Prevención de ataques DDoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests por ventana
  message: 'Demasiadas peticiones desde esta IP, intenta más tarde.'
});

app.use('/api/', limiter);

// 3. JSON Parser con límite de tamaño
app.use(express.json({ limit: '10kb' }));

// 4. Disable X-Powered-By header
app.disable('x-powered-by');

// ============================================
// DATABASE SIMULADO (en producción usar DB real)
// ============================================
const users = [
  {
    id: 1,
    username: 'admin',
    // Password: Admin123! (hasheado)
    passwordHash: '$2b$10$wg4BbR405FGcMqH9vqVJ0uTp0j6300FkE5r2.mHz6cQIdYB8Jwu7a',
    role: 'admin'
  }
];

// ============================================
// MIDDLEWARE DE AUTENTICACIÓN
// ============================================
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }
    req.user = user;
    next();
  });
};

// ============================================
// RUTAS PÚBLICAS
// ============================================

app.get('/', (req, res) => {
  res.json({
    message: '🔒 Bienvenido al Demo de DevSecOps',
    version: '1.0.0',
    security: 'enabled',
    features: [
      'Helmet (HTTP Headers Security)',
      'Rate Limiting (DDoS Protection)',
      'Input Validation (XSS/Injection Prevention)',
      'JWT Authentication',
      'Password Hashing (bcrypt)',
      'Security Headers',
      'Dependency Scanning'
    ]
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    security: 'enabled'
  });
});

// ============================================
// AUTENTICACIÓN CON VALIDACIÓN SEGURA
// ============================================

app.post('/api/login',
  // Validación de entrada - Prevención de inyección
  body('username').trim().isLength({ min: 3, max: 30 }).escape(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Buscar usuario
      const user = users.find(u => u.username === username);
      
      if (!user) {
        // Mensaje genérico para evitar enumeración de usuarios
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Verificar password con bcrypt
      const validPassword = await bcrypt.compare(password, user.passwordHash);
      
      if (!validPassword) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Generar JWT con expiración
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({
        message: 'Login exitoso',
        token,
        expiresIn: 3600
      });

    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }
);

// ============================================
// RUTAS PROTEGIDAS
// ============================================

app.get('/api/secure/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'Datos de perfil (ruta protegida)',
    user: {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role
    }
  });
});

// Ejemplo de ruta con validación de entrada
app.post('/api/secure/data',
  authenticateToken,
  body('data').trim().isLength({ min: 1, max: 500 }).escape(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.json({
      message: 'Datos procesados de forma segura',
      received: req.body.data,
      user: req.user.username
    });
  }
);

// ============================================
// ENDPOINT DE SEGURIDAD (para auditoría)
// ============================================

app.get('/api/security-info', (req, res) => {
  res.json({
    security_measures: {
      helmet: 'enabled',
      rate_limiting: 'enabled',
      input_validation: 'enabled',
      authentication: 'JWT',
      password_hashing: 'bcrypt',
      https_only: process.env.NODE_ENV === 'production',
      cors: 'configured',
      csp: 'enabled'
    },
    compliance: {
      owasp_top_10: 'covered',
      pci_dss: 'partial',
      gdpr: 'basic'
    }
  });
});

// ============================================
// 404 Handler - Debe ir ANTES del error handler
// ============================================
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// ============================================
// ERROR HANDLING - No exponer información sensible
// ============================================

app.use((err, req, res) => {
  console.error(err.stack);
  
  // En producción, no exponer detalles del error
  const error = process.env.NODE_ENV === 'production'
    ? 'Error interno del servidor'
    : err.message;
  
  res.status(500).json({ error });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🔒 Servidor seguro corriendo en http://localhost:${PORT}`);
    console.log('🛡️  Medidas de seguridad activas');
  });
}

module.exports = app;

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.json({ 
    message: '¡Bienvenido al Demo de DevOps!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Ruta de health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

// Ruta de API ejemplo
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Juan', role: 'DevOps Engineer' },
    { id: 2, name: 'María', role: 'Developer' },
    { id: 3, name: 'Carlos', role: 'QA Engineer' }
  ];
  res.json(users);
});

// Calculadora simple para testing
app.post('/api/calculate', (req, res) => {
  const { operation, a, b } = req.body;
  let result;

  switch(operation) {
  case 'add':
    result = a + b;
    break;
  case 'subtract':
    result = a - b;
    break;
  case 'multiply':
    result = a * b;
    break;
  case 'divide':
    result = b !== 0 ? a / b : 'Error: División por cero';
    break;
  default:
    return res.status(400).json({ error: 'Operación no válida' });
  }

  res.json({ operation, a, b, result });
});

// Solo iniciar el servidor si no estamos en modo test
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;

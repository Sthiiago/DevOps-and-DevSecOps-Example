# 🚀 DevOps y DevSecOps - Ejemplos Prácticos

[![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=github-actions)](https://github.com/Sthiiago/DevOps-and-DevSecOps-Example/actions)
[![Security](https://img.shields.io/badge/Security-DevSecOps-success)](https://github.com/Sthiiago/DevOps-and-DevSecOps-Example)
[![Node.js](https://img.shields.io/badge/Node.js-v22.14.0-339933?logo=node.js)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker)](https://www.docker.com/)

> 🎓 **Ejemplos prácticos completos** de **DevOps** y **DevSecOps** para presentaciones educativas, demostraciones en clase y aprendizaje de mejores prácticas.
> 
> ⚡ Los pipelines de CI/CD se ejecutan automáticamente en cada push. [Ver Actions →](https://github.com/Sthiiago/DevOps-and-DevSecOps-Example/actions)

## 📋 Contenido del Repositorio

```
DevOps-and-DevSecOps-Example/
├── 1-DevOps-Example/          # 🔧 Ejemplo DevOps básico
├── 2-DevSecOps-Example/       # 🔒 Ejemplo DevSecOps con seguridad
├── *.postman_collection.json  # 📮 Colecciones de Postman para testing
├── *.ps1                      # 🖥️ Scripts de automatización
└── *.md                       # 📚 Documentación completa
```

---

## 🎯 Ejemplos Incluidos

### 1️⃣ **DevOps Example** - Pipeline CI/CD Completo

**Ubicación:** [`1-DevOps-Example/`](./1-DevOps-Example/)

Aplicación REST API básica que demuestra:
- ✅ **CI/CD Pipeline** con GitHub Actions
- ✅ **Testing automatizado** con Jest
- ✅ **Linting** con ESLint
- ✅ **Containerización** con Docker
- ✅ **Docker Compose** para orquestación
- ✅ **Build & Deploy** automatizados

**Endpoints:**
```
GET  /              → Información de la app
GET  /health        → Health check con uptime
GET  /api/users     → Lista de usuarios
POST /api/calculate → Calculadora (add, subtract, multiply, divide)
```

**Tests:** 7 tests unitarios ✅

---

### 2️⃣ **DevSecOps Example** - Seguridad Integrada

**Ubicación:** [`2-DevSecOps-Example/`](./2-DevSecOps-Example/)

Aplicación REST API con **seguridad integrada** que demuestra:
- 🔒 **JWT Authentication** con bcrypt
- 🛡️ **Helmet.js** para headers HTTP seguros
- ⚡ **Rate Limiting** contra DDoS
- ✅ **Input Validation** con express-validator
- 🔐 **Password Hashing** con bcrypt
- 🔍 **Security Pipeline** con múltiples herramientas:
  - SAST (Snyk, SonarCloud)
  - Dependency Scanning
  - OWASP ZAP
  - Trivy para containers
- 🐳 **Multi-stage Docker** builds
- 📊 **OWASP Top 10** coverage

**Endpoints:**
```
GET  /                → Features de seguridad
GET  /health          → Health check + security info
GET  /security-info   → Detalle de medidas de seguridad
POST /api/auth/login  → Autenticación JWT
GET  /api/protected   → Ruta protegida (requiere token)
POST /api/data        → Envío de datos con validación
```

**Tests:** 13 tests de seguridad ✅

**Credenciales de Demo:**
- Username: `admin`
- Password: `Admin123!`

---

## 🚀 Inicio Rápido

### Prerequisitos

- Node.js v22.14.0 o superior
- npm (incluido con Node.js)
- Docker (opcional, para containerización)
- Git
- Postman (para testing de APIs)

### Instalación y Ejecución

#### Opción 1: Ejecutar localmente con npm

**DevOps Example:**
```powershell
cd 1-DevOps-Example
npm install
npm start
# Servidor corriendo en http://localhost:3000
```

**DevSecOps Example:**
```powershell
cd 2-DevSecOps-Example
npm install
npm start
# Servidor corriendo en http://localhost:3000
```

#### Opción 2: Ejecutar con Docker

**DevOps Example:**
```powershell
cd 1-DevOps-Example
docker-compose up
```

**DevSecOps Example:**
```powershell
cd 2-DevSecOps-Example
docker-compose up
```

#### Opción 3: Scripts de Automatización

Usa los scripts de PowerShell incluidos:
```powershell
# Demo DevOps
.\demo-devops.ps1

# Demo DevSecOps
.\demo-devsecops.ps1

# Test ambos proyectos
.\test-demos.ps1
```

---

## 🧪 Testing con Postman

### Importar Colecciones

1. **Abre Postman**
2. Click en **Import**
3. Importa los archivos:
   - `DevOps-Demo.postman_collection.json` (9 requests)
   - `DevSecOps-Demo.postman_collection.json` (14 requests)

### Uso de las Colecciones

**DevOps Demo:**
- Ejecuta los requests en orden para ver las funcionalidades básicas
- Prueba los endpoints de calculadora
- Verifica el manejo de errores

**DevSecOps Demo:**
- **Carpeta 1:** Información general
- **Carpeta 2:** Autenticación (ejecuta "Login Exitoso" primero)
- **Carpeta 3:** Rutas protegidas (el token se guarda automáticamente)
- **Carpeta 4:** Rate limiting
- **Carpeta 5:** Manejo de errores

📖 **Ver guía completa:** [`GUIA-POSTMAN.md`](./GUIA-POSTMAN.md)

---

## 📚 Documentación Completa

### Guías Disponibles

| Archivo | Descripción |
|---------|-------------|
| [`PRESENTACION.md`](./PRESENTACION.md) | Contenido completo para slides de presentación |
| [`SLIDES.md`](./SLIDES.md) | Slides organizados por sección |
| [`GUIA-CLASE.md`](./GUIA-CLASE.md) | Guía paso a paso para instructor |
| [`GUIA-POSTMAN.md`](./GUIA-POSTMAN.md) | Instrucciones detalladas de Postman |
| [`COMANDOS-DEMO.md`](./COMANDOS-DEMO.md) | Comandos para demostraciones en vivo |
| [`TODO-LISTO.md`](./TODO-LISTO.md) | Checklist de preparación |
| [`CORRECCIONES.md`](./CORRECCIONES.md) | Registro de fixes aplicados |

---

## 🏗️ Arquitectura

### DevOps Pipeline (GitHub Actions)

```yaml
Workflow: CI/CD Pipeline
├── Lint (ESLint)
├── Test (Jest)
├── Build (Docker)
├── Security Scan (básico)
└── Deploy (staging/production)
```

### DevSecOps Pipeline (GitHub Actions)

```yaml
Workflow: Security-Integrated Pipeline
├── Lint (ESLint + Security rules)
├── Unit Tests (Jest)
├── SAST (Snyk Code)
├── Dependency Scan (Snyk)
├── Build (Docker multi-stage)
├── Container Scan (Trivy)
├── DAST (OWASP ZAP)
├── Security Report
└── Deploy (con validaciones)
```

---

## 🔐 Características de Seguridad (DevSecOps)

### Protecciones Implementadas

| Categoría | Herramienta/Técnica | Protege Contra |
|-----------|---------------------|----------------|
| **Authentication** | JWT + bcrypt | Accesos no autorizados |
| **HTTP Headers** | Helmet.js | XSS, Clickjacking, MIME sniffing |
| **Rate Limiting** | express-rate-limit | DDoS, Brute force |
| **Input Validation** | express-validator | Injection, XSS |
| **Password Security** | bcrypt (10 rounds) | Rainbow tables, brute force |
| **SAST** | Snyk, SonarCloud | Vulnerabilidades en código |
| **Dependency Scan** | Snyk, npm audit | Librerías vulnerables |
| **Container Scan** | Trivy | Vulnerabilidades en imágenes |
| **DAST** | OWASP ZAP | Vulnerabilidades en runtime |

### OWASP Top 10 Coverage

✅ **A01:2021** - Broken Access Control → JWT + Authorization  
✅ **A02:2021** - Cryptographic Failures → bcrypt + HTTPS  
✅ **A03:2021** - Injection → Input validation + sanitization  
✅ **A04:2021** - Insecure Design → Security-first architecture  
✅ **A05:2021** - Security Misconfiguration → Helmet + secure defaults  
✅ **A06:2021** - Vulnerable Components → Dependency scanning  
✅ **A07:2021** - Authentication Failures → JWT + strong passwords  
✅ **A08:2021** - Software and Data Integrity → Pipeline security  
✅ **A09:2021** - Security Logging Failures → Comprehensive logging  
✅ **A10:2021** - SSRF → Input validation + URL filtering  

---

## 🧪 Testing

### Ejecutar Tests

**DevOps Example:**
```powershell
cd 1-DevOps-Example
npm test
# ✅ 7 tests passing
```

**DevSecOps Example:**
```powershell
cd 2-DevSecOps-Example
npm test
# ✅ 13 tests passing
```

### Coverage de Tests

- **DevOps:** Tests funcionales básicos
- **DevSecOps:** Tests de seguridad + funcionales
  - Authentication tests
  - Authorization tests
  - Input validation tests
  - Rate limiting tests
  - Error handling tests

---

## 📊 Comparación DevOps vs DevSecOps

| Característica | DevOps | DevSecOps |
|----------------|--------|-----------|
| **Velocidad de desarrollo** | ⚡⚡⚡ | ⚡⚡ |
| **Seguridad** | ⭐ | ⭐⭐⭐⭐⭐ |
| **Complejidad del pipeline** | Baja | Media-Alta |
| **Tiempo de pipeline** | ~3-5 min | ~10-15 min |
| **Tests de seguridad** | Básicos | Exhaustivos |
| **Costo de implementación** | Bajo | Medio |
| **Reducción de vulnerabilidades** | 20% | 80% |
| **Detección temprana de issues** | Build/Deploy | Desde commit |

---

## 🎓 Uso Educativo

### Para Instructores

1. **Preparación:**
   - Revisa [`GUIA-CLASE.md`](./GUIA-CLASE.md)
   - Importa colecciones de Postman
   - Prueba ambos proyectos localmente
   - Revisa [`TODO-LISTO.md`](./TODO-LISTO.md)

2. **Durante la Clase:**
   - Usa [`SLIDES.md`](./SLIDES.md) para presentación
   - Demuestra con Postman (más visual)
   - Sigue [`GUIA-POSTMAN.md`](./GUIA-POSTMAN.md)
   - Tiempo estimado: 30 minutos

3. **Ejercicios para Estudiantes:**
   - Clonar repositorio
   - Ejecutar ambos ejemplos
   - Comparar pipelines en GitHub Actions
   - Modificar código y ver impacto en tests
   - Agregar nuevas validaciones de seguridad

### Para Estudiantes

1. **Clona el repositorio:**
```bash
git clone https://github.com/Sthiiago/DevOps-and-DevSecOps-Example.git
cd DevOps-and-DevSecOps-Example
```

2. **Explora ambos ejemplos:**
   - Lee los README en cada carpeta
   - Ejecuta los tests
   - Prueba las APIs con Postman

3. **Aprende haciendo:**
   - Modifica endpoints
   - Agrega nuevos tests
   - Experimenta con las configuraciones de seguridad

---

## 🛠️ Stack Tecnológico

### Backend
- **Runtime:** Node.js v22.14.0
- **Framework:** Express.js
- **Testing:** Jest + Supertest
- **Linting:** ESLint

### DevOps
- **CI/CD:** GitHub Actions
- **Containerización:** Docker + Docker Compose
- **Versionado:** Git + GitHub

### DevSecOps
- **Authentication:** jsonwebtoken
- **Password Hashing:** bcrypt
- **HTTP Security:** helmet
- **Rate Limiting:** express-rate-limit
- **Input Validation:** express-validator
- **SAST:** Snyk, SonarCloud
- **Container Security:** Trivy
- **DAST:** OWASP ZAP

### Testing & Demo
- **API Testing:** Postman
- **Automation:** PowerShell scripts

---

## 📖 Recursos Adicionales

### Documentación Oficial
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Docs](https://docs.github.com/actions)

### Seguridad
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP ZAP](https://www.zaproxy.org/)
- [Snyk Documentation](https://docs.snyk.io/)
- [JWT Best Practices](https://jwt.io/introduction)

### DevSecOps
- [DevSecOps Manifesto](https://www.devsecops.org/)
- [Shift Left Security](https://www.dynatrace.com/news/blog/what-is-shift-left-security/)

---

## 🤝 Contribuciones

Este proyecto es educativo y abierto a mejoras. Si encuentras bugs o tienes sugerencias:

1. Abre un **Issue** describiendo el problema
2. Haz un **Fork** del repositorio
3. Crea una **Branch** para tu feature (`git checkout -b feature/AmazingFeature`)
4. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
5. **Push** a la branch (`git push origin feature/AmazingFeature`)
6. Abre un **Pull Request**

---

## 📝 Licencia

Este proyecto es de uso educativo y está disponible bajo licencia MIT.

---

## ⭐ Agradecimientos

- A la comunidad de DevOps y DevSecOps
- A todos los contribuidores de las herramientas open source utilizadas
- A los estudiantes que utilizan estos ejemplos para aprender

---

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:
- 📧 Abre un Issue en GitHub
- 📚 Revisa la documentación en los archivos `.md`
- 💬 Consulta las guías de uso incluidas

---

<div align="center">

**⚡ DevOps** + **🔒 Security** = **DevSecOps**

*"Security is not a feature, it's a foundation"*

---

Made with ❤️ for education and learning

[⬆ Volver arriba](#-devops-y-devsecops---ejemplos-prácticos)

</div>

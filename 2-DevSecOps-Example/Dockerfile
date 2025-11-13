# Dockerfile seguro para DevSecOps
# Multi-stage build para reducir superficie de ataque

# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias (incluyendo dev para build)
RUN npm ci

# Copiar código fuente
COPY . .

# Stage 2: Production
FROM node:18-alpine

# Metadatos
LABEL maintainer="DevSecOps Team"
LABEL description="Demo de DevSecOps con Node.js"
LABEL security.scan="true"

# Instalar dumb-init para manejar señales correctamente
RUN apk add --no-cache dumb-init

# Crear usuario no-privilegiado
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias desde builder
COPY --chown=nodejs:nodejs --from=builder /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs --from=builder /app/package*.json ./

# Copiar código fuente
COPY --chown=nodejs:nodejs . .

# Cambiar a usuario no-privilegiado
USER nodejs

# Exponer puerto
EXPOSE 3000

# Variables de entorno de seguridad
ENV NODE_ENV=production
ENV NPM_CONFIG_LOGLEVEL=warn

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Usar dumb-init para manejar señales
ENTRYPOINT ["dumb-init", "--"]

# Comando de inicio
CMD ["node", "app.js"]

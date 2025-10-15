# Etapa 1: Construcción
FROM node:18-alpine AS build

WORKDIR /app

# Instalar las dependencias de la aplicación
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copiar el resto del código de la aplicación
COPY . ./

# Build-time arguments for environment variables
ARG REACT_APP_NASA_API_KEY
ENV REACT_APP_NASA_API_KEY=$REACT_APP_NASA_API_KEY

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Copiar los archivos de construcción al directorio de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 para que se pueda acceder a la aplicación
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]


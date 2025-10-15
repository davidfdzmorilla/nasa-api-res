# Etapa 1: Construcción
FROM node:18-alpine AS build

WORKDIR /app

# Instalar las dependencias de la aplicación
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copiar el resto del código de la aplicación
COPY . ./

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Copiar los archivos de construcción al directorio de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx si es necesario (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 para que se pueda acceder a la aplicación
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]


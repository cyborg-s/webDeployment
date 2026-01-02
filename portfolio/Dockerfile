# Stage 1: Build Angular app
FROM node:20-alpine AS build

WORKDIR /app

# Package installieren
COPY public/package*.json ./
RUN npm ci

# Restliche Dateien kopieren und builden
COPY public/. .
RUN npx ng build --configuration production --output-path=dist/portfolio

# Stage 2: Nginx
FROM nginx:alpine

# Angular Build kopieren
COPY --from=build /app/dist/portfolio /usr/share/nginx/html

# Eigene nginx Konfiguration kopieren
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

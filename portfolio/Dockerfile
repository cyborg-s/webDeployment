# Stage 1: Build Angular app
FROM node:20-alpine AS build
WORKDIR /app

# package.json und package-lock.json kopieren
COPY public/package*.json ./

# Dependencies installieren
RUN npm ci

# gesamten Angular-Quellcode kopieren
COPY public/. .

# Angular Build für Production
RUN npx ng build --configuration production

# Stage 2: Nginx für Serving
FROM nginx:alpine

# Alte default html entfernen
RUN rm -rf /usr/share/nginx/html/*

# gebaute Angular App kopieren
COPY --from=build /app/dist/portfolio /usr/share/nginx/html

# Nginx Konfiguration optional kopieren, falls nötig
# COPY ./proxy/site.conf /etc/nginx/conf.d/default.conf

# Stage 1: Angular Build
FROM node:20-alpine AS build

WORKDIR /app

# Zum Angular-Projekt wechseln
WORKDIR /app/public

# Package.json & lockfile kopieren
COPY public/package*.json ./

# Dependencies installieren
RUN npm ci

# Restliches Angular-Projekt kopieren
COPY public/. ./

# Angular Production Build
RUN npx ng build --configuration production

# Stage 2: Nginx
FROM nginx:alpine

# Angular Build output in Nginx html Verzeichnis kopieren
COPY --from=build /app/public/dist/public /usr/share/nginx/html

# Port 80 freigeben
EXPOSE 80

# Nginx starten
CMD ["nginx", "-g", "daemon off;"]


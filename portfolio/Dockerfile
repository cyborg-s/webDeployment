# Stage 1: Angular Build
FROM node:20-alpine AS build

# Arbeitsverzeichnis im Container
WORKDIR /app

# Nur package.json und package-lock.json kopieren
COPY /public/package*.json ./

# Dependencies installieren
RUN npm ci

# Rest des Projekts kopieren (inklusive angular.json und src/)
COPY /public/ ./

# Angular Production Build
RUN npx ng build --configuration production

# Stage 2: Nginx
FROM nginx:alpine

# Angular Build output in Nginx html Verzeichnis kopieren
COPY --from=build /app/dist/portfolio /usr/share/nginx/html

# Nginx Port freigeben
EXPOSE 80

# Nginx im Vordergrund starten
CMD ["nginx", "-g", "daemon off;"]

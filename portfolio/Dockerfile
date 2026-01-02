# 1️⃣ Node Image zum Bauen der Angular App
FROM node:20-alpine AS build

# Arbeitsverzeichnis im Container
WORKDIR /app

# Package Dateien kopieren und Abhängigkeiten installieren
COPY package.json package-lock.json ./
RUN npm ci

# Restliche Angular-Dateien kopieren
COPY . .

# Angular App für Produktion bauen
RUN npx ng build --configuration production

# 2️⃣ NGINX Image zum Ausliefern der gebauten Dateien
FROM nginx:alpine

# Lösche die Standardseite
RUN rm -rf /usr/share/nginx/html/*

# Kopiere die gebauten Dateien vom vorherigen Build-Stage
COPY --from=build /app/dist/portfolio/ /usr/share/nginx/html/

# Optional: Angular Routing fix (refresh auf Routen funktioniert)
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

# NGINX Port freigeben
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]

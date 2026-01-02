# Build Stage
FROM node:20-alpine AS build
WORKDIR /app

# Package.json kopieren und Dependencies installieren
COPY public/package*.json ./
RUN npm ci

# App-Code kopieren und Production Build erstellen
COPY public/. .
RUN npx ng build --configuration production

# Production Stage
FROM nginx:alpine
# Angular Build in Nginx html Ordner kopieren
COPY --from=build /app/dist/portfolio /usr/share/nginx/html
# Eigene Nginx-Konfiguration kopieren
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

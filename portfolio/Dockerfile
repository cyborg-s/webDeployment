# Stage 1: Angular Build
FROM node:20-alpine AS build

WORKDIR /app/public

COPY package*.json ./
RUN npm ci

COPY . ./
RUN npx ng build --configuration production

# Stage 2: Nginx
FROM nginx:alpine

# Angular Build output in Nginx html Verzeichnis kopieren
COPY --from=build /app/public/dist/portfolio /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

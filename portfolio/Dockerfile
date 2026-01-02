# Stage 1: Angular Build
FROM node:20-alpine AS build

WORKDIR /app

# package.json und package-lock.json aus dem public-Ordner kopieren
COPY public/package*.json ./ 

RUN npm ci

# Angular Projekt kopieren
COPY public/. .

# Angular Production Build
RUN npx ng build --configuration production

# Stage 2: Nginx
FROM nginx:alpine
COPY --from=build /app/dist/portfolio /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


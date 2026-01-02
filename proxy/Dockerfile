# Stage 1: Angular build
FROM node:20-alpine AS build
WORKDIR /app
COPY portfolio/public/package*.json ./
RUN npm ci
COPY portfolio/public/ ./
RUN npx ng build --configuration production

# Stage 2: Nginx for serving Angular + proxy
FROM nginx:alpine
COPY --from=build /app/dist/portfolio /usr/share/nginx/html
COPY proxy/site.conf /etc/nginx/conf.d/default.conf
COPY proxy/certs /etc/nginx/certs
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]

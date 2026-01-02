# build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY public/package*.json ./
RUN npm ci
COPY public/. .
RUN npx ng build --configuration production

# production stage
FROM nginx:alpine
COPY --from=build /app/dist/portfolio/browser /usr/share/nginx/html

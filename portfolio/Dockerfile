FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build:ssr   # Angular Universal build
EXPOSE 4000
CMD ["node", "dist/portfolio/server/main.js"]

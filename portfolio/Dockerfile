# portfolio/Dockerfile
ARG DIST_DIR
FROM nginx:alpine
COPY ${DIST_DIR} /usr/share/nginx/html
COPY proxy/site.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
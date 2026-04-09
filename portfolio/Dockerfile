FROM nginx:alpine
COPY public/dist/portfolio/browser/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
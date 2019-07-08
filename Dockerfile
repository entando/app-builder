FROM nginx:latest

EXPOSE 80
ENV HOME=/usr/share/nginx/html/entando

COPY build $HOME/app-builder
COPY nginx.conf /etc/nginx/nginx.conf

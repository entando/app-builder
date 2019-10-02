FROM centos/nginx-112-centos7:latest

EXPOSE 8081
ENV HOME=/usr/share/nginx/html/entando

COPY build $HOME/app-builder
RUN fix-permissions $HOME
COPY nginx.conf ${NGINX_CONF_PATH}
CMD ${STI_SCRIPTS_PATH}/run

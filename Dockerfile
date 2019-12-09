FROM centos/nginx-112-centos7:latest

EXPOSE 8081
ENV HOME=/usr/share/nginx/html/entando

COPY build $HOME/app-builder
RUN fix-permissions $HOME
COPY nginx.conf ${NGINX_CONF_PATH}

FROM nginx:1.15.2-alpine as release
RUN apk add --no-cache jq
COPY docker-entrypoint.sh ${STI_SCRIPTS_PATH}
ENTRYPOINT ${STI_SCRIPTS_PATH}/docker-entrypoint.sh

CMD ${STI_SCRIPTS_PATH}/run

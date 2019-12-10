FROM centos/nginx-112-centos7:latest
EXPOSE 8081
ENV HOME=/usr/share/nginx/html/entando
COPY build $HOME/app-builder
RUN fix-permissions $HOME
COPY nginx.conf ${NGINX_CONF_PATH}

COPY docker-entrypoint.sh /usr/local/bin
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ${STI_SCRIPTS_PATH}/run
FROM centos/nginx-112-centos7:latest
EXPOSE 8081
COPY ./build /opt/app-root/src/app-builder
USER root
RUN fix-permissions /opt/app-root/src/app-builder
COPY ./nginx.conf ${NGINX_CONF_PATH}
USER default
COPY ./docker-entrypoint.sh /usr/local/bin
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ${STI_SCRIPTS_PATH}/run
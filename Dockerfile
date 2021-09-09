FROM registry.access.redhat.com/ubi8/nginx-118:1-25
ARG VERSION
### Required OpenShift Labels
LABEL name="Entando App Builder" \
      maintainer="dev@entando.com" \
      vendor="Entando Inc." \
      version="v${VERSION}" \
      release="6.4.0" \
      summary="Entando App Builder" \
      description="The Entando App Builder is the front end environment to interact with the micro frontends, the WCMS, and other Entando components"

COPY licenses /licenses

EXPOSE 8081
COPY ./build /opt/app-root/src/app-builder
USER root
#RUN yum -y update
RUN fix-permissions /opt/app-root/src/app-builder
COPY ./nginx.conf ${NGINX_CONF_PATH}
USER default
COPY ./docker-entrypoint.sh /usr/local/bin
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]


FROM registry.access.redhat.com/ubi8/nginx-118
ARG VERSION
### Required OpenShift Labels
LABEL name="Entando App Builder" \
      maintainer="dev@entando.com" \
      vendor="Entando Inc." \
      version="v${VERSION}" \
      release="6.3.0" \
      summary="Entando App Builder" \
      description="The Entando App Builder is the front end environment to interact with the micro frontends, the WCMS, and other Entando components"

COPY licenses /licenses

USER root
RUN yum --disableplugin=subscription-manager -y update-minimal --security --sec-severity=Important --sec-severity=Critical

# These are for https://access.redhat.com/errata/RHSA-2021:0670 which are not automatically installing vai the command above
RUN yum update -y python3-bind
RUN yum update -y bind-utils
RUN yum update -y bind-license
RUN yum update -y bind-libs-lite
RUN yum update -y bind-libs
USER default


EXPOSE 8081
COPY ./build /opt/app-root/src/app-builder
USER root
RUN fix-permissions /opt/app-root/src/app-builder
COPY ./nginx.conf ${NGINX_CONF_PATH}
USER default
COPY ./docker-entrypoint.sh /usr/local/bin
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]





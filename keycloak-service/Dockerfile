# build a keycloak container with the homeManager theme
FROM jboss/keycloak:6.0.1

WORKDIR /opt/jboss/keycloak/

COPY . ./

# get admin username from compose file
ARG KEYCLOAK_ROOT_USER
ENV KEYCLOAK_USER=$KEYCLOAK_ROOT_USER

# get admin password from compose file
ARG KEYCLOAK_ROOT_PASS
ENV KEYCLOAK_PASSWORD=$KEYCLOAK_ROOT_PASS
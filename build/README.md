# Docker Compose

Build all 3 containers with [Docker Compose](https://docs.docker.com/compose/).

Dependencies:
* Docker Compose
* Node.js
* Angular CLI

## Build From Source

Clone the project files onto your server:

``git clone https://github.com/andrewsgardner/apartmentManager.git .``

Install npm dependencies and build graphql-service:

1. Navigate to [/graphql-service](https://github.com/andrewsgardner/apartmentManager/tree/master/graphql-service):
2. ``npm install``
3. ``npm run start``

Install npm dependencies and build ui-service:

1. Navigate to [/ui-service](https://github.com/andrewsgardner/apartmentManager/tree/master/ui-service):
2. ``npm install``
3. ``npm run build``

## Environment Variables

Navigate to [/build](https://github.com/andrewsgardner/apartmentManager/tree/master/build) and create an environment file: ``.env``

Docker Compose will expect values for the following environment variables:

### Production:

```
MONGO_ROOT_USER_PROD=root
MONGO_ROOT_PASS_PROD=your_value
MONGO_ROOT_DB_PROD=admin
MONGO_HOST_PROD=mongo
MONGO_PORT_PROD=your_value
MONGO_APP_DB_PROD=your_value
KEYCLOAK_ROOT_USER_PROD=your_value
KEYCLOAK_ROOT_PASS_PROD=your_value
KEYCLOAK_PORT_PROD=8080
APP_MONGO_USER_PROD=your_value
APP_MONGO_PASS_PROD=your_value
GQL_PORT_PROD=your_value
UI_PORT_PROD=your_value
```

The value for ``MONGO_ROOT_USER_PROD`` should be **root** - which references the MongoDB root user.

The value for ``MONGO_ROOT_DB_PROD`` should be **admin** - which references the MongoDB admin database.

The value for ``MONGO_HOST_PROD`` should be **mongo** - which references the MongoDB service container.

The value for ``KEYCLOAK_PORT_PROD`` should be **8080** unless Keycloak's port-offset value has been modified with [standalone.sh](https://codehumsafar.wordpress.com/2018/09/22/keycloak-run-server-at-different-port/).

**Configure Nginx:\***

1. Specify the Nginx port in [ui-service/nginx.prod.conf](https://github.com/andrewsgardner/apartmentManager/blob/master/ui-service/nginx.prod.conf). This should match ``UI_PORT_PROD``.

2. Specify the Keycloak port in [ui-service/nginx.prod.conf](https://github.com/andrewsgardner/apartmentManager/blob/master/ui-service/nginx.prod.conf). This should match ``KEYCLOAK_PORT_PROD``.

###### *Manual configuration required - not included in docker compose build.

### Development:

```
MONGO_ROOT_USER=root
MONGO_ROOT_PASS=your_value
MONGO_ROOT_DB=admin
MONGO_HOST=mongo
MONGO_PORT=your_value
MONGO_APP_DB=your_value
KEYCLOAK_ROOT_USER=your_value
KEYCLOAK_ROOT_PASS=your_value
KEYCLOAK_PORT=8080
APP_MONGO_USER=your_value
APP_MONGO_PASS=your_value
GQL_PORT=your_value
UI_PORT=your_value
```

The value for ``MONGO_ROOT_USER`` should be **root** - which references the MongoDB root user.

The value for ``MONGO_ROOT_DB`` should be **admin** - which references the MongoDB admin database.

The value for ``MONGO_HOST`` should be **mongo** - which references the MongoDB service container.

The value for ``KEYCLOAK_PORT`` should be **8080** unless Keycloak's port-offset value has been modified with [standalone.sh](https://codehumsafar.wordpress.com/2018/09/22/keycloak-run-server-at-different-port/).

**Configure Nginx:\***

1. Specify the Nginx port in [ui-service/nginx.dev.conf](https://github.com/andrewsgardner/apartmentManager/blob/master/ui-service/nginx.dev.conf). This should match ``UI_PORT``.

2. Specify the Keycloak port in [ui-service/nginx.dev.conf](https://github.com/andrewsgardner/apartmentManager/blob/master/ui-service/nginx.dev.conf). This should match ``KEYCLOAK_PORT``.

###### *Manual configuration required - not included in docker compose build.

## Docker Compose

Build all containers with Docker Compopose from the [/build](https://github.com/andrewsgardner/apartmentManager/tree/master/build) directory.

**Production:**

Use the alternate [docker-compose-am-prod.yml](https://github.com/andrewsgardner/apartmentManager/blob/master/build/docker-compose-am-prod.yml) file.

```docker-compose -f docker-compose-am-prod.yml up --build -d```

**Development:**

Use the default [docker-compose.yml](https://github.com/andrewsgardner/apartmentManager/blob/master/build/docker-compose.yml) file.

```docker-compose up --build -d```

## Common Docker Commands:

List all containers: ```docker ps```

Execute a bash shell on a container: ```docker exec -it <CONTAINER_ID> sh```

Restart a running container: ```docker restart <CONTAINER_ID>```

Fetch the logs of a container: ```docker logs <CONTAINER_ID>```

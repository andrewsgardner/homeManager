### STAGE 1: Build ###

FROM node:10.16.1-alpine as node

WORKDIR /code

COPY package*.json ./

RUN npm install

COPY . ./

### STAGE 2: Create release container ###

FROM node:10.16.1-alpine

COPY --from=node /code/node_modules /dist/node_modules
COPY --from=node /code/config  /dist/config
COPY --from=node /code/dist /dist/dist

WORKDIR /dist

CMD ["node", "dist/index.js"]
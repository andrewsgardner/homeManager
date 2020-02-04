### STAGE 1: Build ###

# base image
FROM node:10.16.1 as build

# install chrome and update webdriver for protractor tests
RUN set -eux \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list \
    && wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        google-chrome-stable \
    && npm install -g webdriver-manager \
    && webdriver-manager update

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@8.2.0

# add app
COPY . /app

# run tests
RUN ng test --watch=false
# RUN ng e2e --port 4202

# generate prod build
RUN ng build --prod --output-path=dist

### STAGE 2: Setup ###

# base image
FROM nginx:1.16.0-alpine

# copy artifact build from the 'build environment'
COPY --from=build /app/dist /usr/share/nginx/html

# copy nginx config
COPY ./nginx.prod.conf /etc/nginx/conf.d/default.conf

# expose port 80
EXPOSE 80
FROM node:latest AS builder
MAINTAINER melodia

# setup environment variable
ENV DOCKERHOME=/usr/local/melodia/web

# set work directory  
RUN mkdir -p $DOCKERHOME

# where your code lives  
WORKDIR $DOCKERHOME

COPY ./melodia/package.json $DOCKERHOME/package.json
COPY ./melodia/package-lock.json $DOCKERHOME/package-lock.json
RUN npm ci

COPY ./melodia/public/ $DOCKERHOME/public/
COPY ./melodia/src/ $DOCKERHOME/src/
RUN npm run build

FROM nginx:alpine
MAINTAINER melodia
COPY --from=builder /usr/local/melodia/web/build/ /usr/share/nginx/html
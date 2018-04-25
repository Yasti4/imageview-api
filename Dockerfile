FROM node:alpine
WORKDIR /home/node/imageview
COPY . /home/node/imageview
RUN /bin/sh -c "yarn install"
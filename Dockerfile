FROM node:alpine
WORKDIR /home/node/imageview
COPY . /home/node/imageview
RUN /bin/sh -c "npm install --silent --progress=false"
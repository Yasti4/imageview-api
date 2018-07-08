FROM node:carbon
WORKDIR /usr/app
COPY package.json yarn.* ./
RUN yarn
COPY . .
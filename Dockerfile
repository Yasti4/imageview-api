FROM node:carbon
WORKDIR /usr/app
COPY package.json yarn.* ./
RUN yarn add bcrypt
RUN yarn
COPY . .
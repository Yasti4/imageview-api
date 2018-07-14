FROM node:carbon
WORKDIR /usr/app
COPY package.json yarn.* ./
RUN npm install
COPY . .

FROM node
WORKDIR /usr/app
COPY package.json yarn.* ./
RUN yarn
COPY . .
FROM node:latest

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app
COPY package.json $HOME/imageview/
RUN chown -R app:app $HOME/*

USER app 
WORKDIR $HOME/imageview
RUN npm install --silent --progress=false

USER root
COPY . $HOME/imageview
RUN chown -R app:app $HOME/*
USER app
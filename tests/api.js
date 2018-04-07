'use strict';

const dotenv = require('dotenv');
dotenv.load();

const {
  graphql
} = require('graphql');
const schema = require('./../src/schema');
const db = require('./../src/models');
const ctx = {
  db,
  isAuth: false,
  userAuth: null
};

module.exports = (query) => {
  return graphql(schema, query, ctx, ctx);
};

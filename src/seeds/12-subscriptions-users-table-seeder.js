'use strict';

exports.seed = (knex) => {
  return knex('subscriptions_users').del().then(async () => {
    const {
      seedingLog,
      randomItem 
    } = require('./../helpers');
    const faker = require('faker/locale/es');
    const User = require('../models/user');
    const Post = require('../models/post');
    const limit = 20;
    const items = [];
    const users = (await User.get()).toJSON().map(item => item.id);
    let data;
    for (let index = 0; index < limit; index++) {
      do {
        data = {
          user_followed: randomItem(users),
          user_follower: randomItem(users),
        };
      } while (data.user_followed === data.user_follower || items.findIndex(item =>
          item.user_followed === data.user_followed && item.user_follower && data.user_follower
        ) !== -1);
      items.push(data);
    }
    return knex('subscriptions_users').insert(items)
      .then(() => seedingLog('SubscriptionsUsersTableSeeder', {
        color: 'green'
      }))
      .catch((error) => seedingLog('SubscriptionsUsersTableSeeder', {
        color: 'red',
        err: error
      }));
  });
};
'use strict';

exports.seed = (knex) => {
  return knex('subscriptions_albums').del().then(async () => {
    const {
      seedingLog,
      randomItem 
    } = require('./../helpers');
    const faker = require('faker/locale/es');
    const User = require('../models/user');
    const Album = require('../models/album');
    const limit = 20;
    const items = [];
    const albums = (await Album.get()).toJSON().map(item => item.id);
    const users = (await User.get()).toJSON().map(item => item.id);
    let album_user;
    for (let index = 0; index < limit; index++) {
      do {
        album_user = {
          album_id: randomItem(albums),
          user_id: randomItem(users),
        };
      } while (items.findIndex(item =>
          item.album_id === album_user.album_id && item.user_id && album_user.user_id
        ) !== -1);
      items.push(album_user);
    }
    return knex('subscriptions_albums').insert(items)
      .then(() => seedingLog('SubscriptionsAlbumsTableSeeder', {
        color: 'green'
      }))
      .catch((error) => seedingLog('SubscriptionsAlbumsTableSeeder', {
        color: 'red',
        err: error
      }));
  });
};
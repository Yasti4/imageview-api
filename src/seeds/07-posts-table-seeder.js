'use strict';

exports.seed = (knex) => {
  return knex('posts').del().then(async () => {
    const {
      seedingLog,
      randomItem 
    } = require('./../helpers');
    const faker = require('faker/locale/es');
    const limit = 60;
    const Visibility = require('../models/visibility');
    const Image = require('../models/image');
    const User = require('../models/user');
    const Album = require('../models/album');
    const usersLimitSeeder = require('./05-users-table-seeder').limit;
    const visibilities = (await Visibility.get()).toJSON().map(item => item.name);
    const images = (await Image.offset(usersLimitSeeder).get()).toJSON().map(item => item.id);
    const users = (await User.get()).toJSON().map(item => item.id);
    const albums = (await Album.get()).toJSON().map(item => item.id);
    const now = new Date();
    return knex('posts').insert([...Array(limit)].map(item => ({
        title: faker.name.title(),
        description: faker.lorem.sentence(),
        user_id: randomItem(users),
        album_id: randomItem([...albums, null, null, null]),
        image: randomItem(images),
        visibility: randomItem(visibilities),
        enable_comments: randomItem([true, true, true, false]),
        created_at: now,
        updated_at: now,
      })))
      .then(() => seedingLog('PostsTableSeeder', {
        color: 'green'
      }))
      .catch((error) => seedingLog('PostsTableSeeder', {
        color: 'red',
        err: error
      }));
  });
};
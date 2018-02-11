'use strict';

exports.seed = (knex) => {
  return knex('likes_posts').del().then(async () => {
    const {
      seedingLog,
      randomItem 
    } = require('./../helpers');
    const faker = require('faker/locale/es');
    const User = require('../models/user');
    const Post = require('../models/post');
    const limit = 20;
    const items = [];
    const posts = (await Post.get()).toJSON().map(item => item.id);
    const users = (await User.get()).toJSON().map(item => item.id);
    let post_user;
    for (let index = 0; index < limit; index++) {
      do {
        post_user = {
          post_id: randomItem(posts),
          user_id: randomItem(users),
        };
      } while (items.findIndex(item =>
          item.post_id === post_user.post_id && item.user_id && post_user.user_id
        ) !== -1);
      items.push(post_user);
    }
    return knex('likes_posts').insert(items)
      .then(() => seedingLog('LikesPostsTableSeeder', {
        color: 'green'
      }))
      .catch((error) => seedingLog('LikesPostsTableSeeder', {
        color: 'red',
        err: error
      }));
  });
};
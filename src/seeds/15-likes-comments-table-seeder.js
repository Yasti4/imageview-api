'use strict';

exports.seed = (knex) => {
  return knex('likes_comments').del().then(async () => {
    const User = require('../models/user');
    const Comment = require('../models/comment');
    const {
      seedingLog,
      randomItem 
    } = require('./../helpers');
    const faker = require('faker/locale/es');
    const limit = 20;
    const items = [];
    const comments = (await Comment.get()).toJSON().map(item => item.id);
    const users = (await User.get()).toJSON().map(item => item.id);
    let comment_user;
    for (let index = 0; index < limit; index++) {
      do {
        comment_user = {
          comment_id: randomItem(comments),
          user_id: randomItem(users),
        };
      } while (items.findIndex(item =>
          item.comment_id === comment_user.comment_id && item.user_id && comment_user.user_id
        ) !== -1);
      items.push(comment_user);
    }
    return knex('likes_comments').insert(items)
      .then(() => seedingLog('LikesCommentsTableSeeder', {
        color: 'green'
      }))
      .catch((error) => seedingLog('LikesCommentsTableSeeder', {
        color: 'red',
        err: error
      }));
  });
};
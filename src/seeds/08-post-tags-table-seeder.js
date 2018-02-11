'use strict';

exports.seed = (knex) => {
  return knex('posts_tags').del().then(async () => {
    const {
      seedingLog,
      randomItem 
    } = require('./../helpers');
    const Post = require('../models/post');
    const Tag = require('../models/tag');
    const limit = 40;
    const faker = require('faker/locale/es');
    const items = [];
    const posts = (await Post.get()).toJSON().map(item => item.id);
    const tags = (await Tag.get()).toJSON().map(item => item.id);
    let post_tag;
    for (let index = 0; index < limit; index++) {
      do {
        post_tag = {
          post_id: randomItem(posts),
          tag_id: randomItem(tags),
        };
      } while (items.findIndex(item =>
          item.post_id === post_tag.post_id && item.tag_id && post_tag.tag_id
        ) !== -1);
      items.push(post_tag);
    }
    return knex('posts_tags').insert(items)
      .then(() => seedingLog('PostsTagsTableSeeder', {
        color: 'green'
      }))
      .catch((error) => seedingLog('PostsTagsTableSeeder', {
        color: 'red',
        err: error
      }));
  });
};
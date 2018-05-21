'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('posts_tags', null, {});
    const limit = 20;
    const { randomItem } = require('./../helpers');
    const { Post, Tag } = require('./../models');
    const items = [];
    const posts = (await Post.findAll()).map(item => item.id);
    const tags = (await Tag.findAll()).map(item => item.id);
    let postTag;
    for (let index = 0; index < limit; index++) {
      do {
        postTag = {
          post_id: randomItem(posts),
          tag_id: randomItem(tags)
        };
      } while (items.findIndex(item =>
        item.post_id === postTag.post_id && item.tag_id && postTag.tag_id
      ) !== -1);
      items.push(postTag);
    }
    return queryInterface.bulkInsert('posts_tags', items, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('posts_tags', null, {});
  }
};

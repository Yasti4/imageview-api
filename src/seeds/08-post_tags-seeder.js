import {
  randomItem
} from '../helpers/index';
import Post from '../models/post';
import Tag from '../models/tag';

const limit = 40;
export const seed = (knex) => {
  return knex('post_tags').del().then(async() => {
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
    return knex('post_tags').insert(items)
      .then(console.log(`Tabla 'post_tags' Datos`, '\x1b[32mOK\x1b[0m'))
      .catch((error) => {
        console.log(`Tabla 'post_tags' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`)
      });
  });
};

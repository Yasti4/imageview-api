const {shuffle} = require('./../../app/util');
const factory = require('./../factories');

async function seed(knex) {
  let postsIds = shuffle((await knex.select('id').from('posts')).map(post => post.id));
  let tagsIds = shuffle((await knex.select('id').from('tags')).map(tag => tag.id));

  postsIds = postsIds.length > 2 ? postsIds.slice(0, postsIds.length / 2) : postsIds;
  tagsIds = tagsIds.length > 2 ? tagsIds.slice(0, tagsIds.length / 2) : tagsIds;

  const items = [];
  postsIds.forEach(post_id => {
    tagsIds.forEach(tag_id => {
      items.push({post_id, tag_id});
    });
  });

  return knex.insert(items.map(item => factory('posts_tags', 1, () => (item)))).into('posts_tags');
}

module.exports = {seed};

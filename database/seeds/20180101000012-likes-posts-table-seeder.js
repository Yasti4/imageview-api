const {shuffle} = require('app/util');
const factory = require('./../factories');

async function seed(knex) {
  let usersIds = shuffle((await knex.select('id').from('users')).map(user => user.id));
  let postsIds = shuffle((await knex.select('id').from('posts')).map(post => post.id));

  usersIds = usersIds.length > 2 ? usersIds.slice(0, usersIds.length / 2) : usersIds;
  postsIds = postsIds.length > 2 ? postsIds.slice(0, postsIds.length / 2) : postsIds;

  const items = [];
  usersIds.forEach(user_id => {
    postsIds.forEach(post_id => {
      items.push({user_id, post_id});
    });
  });

  return knex.insert(items.map(item => factory('likes_posts', 1, () => (item)))).into('likes_posts');
}

module.exports = {seed};

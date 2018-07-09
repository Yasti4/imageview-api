const {shuffle} = require('app/util');
const factory = require('./../factories');

async function seed(knex) {
  let usersIds = shuffle((await knex.select('id').from('users')).map(user => user.id));
  let commentsIds = shuffle((await knex.select('id').from('comments')).map(comment => comment.id));

  usersIds = usersIds.length > 2 ? usersIds.slice(0, usersIds.length / 2) : usersIds;
  commentsIds = commentsIds.length > 2 ? commentsIds.slice(0, commentsIds.length / 2) : commentsIds;

  const items = [];
  usersIds.forEach(user_id => {
    commentsIds.forEach(comment_id => {
      items.push({user_id, comment_id});
    });
  });

  return knex.insert(items.map(item => factory('likes_comments', 1, () => (item)))).into('likes_comments');
}

module.exports = {seed};

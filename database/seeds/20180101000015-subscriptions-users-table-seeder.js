const {shuffle} = require('./../../app/util');
const factory = require('./../factories');

async function seed(knex) {
  let usersFollowersIds = shuffle((await knex.select('id').from('users')).map(user => user.id));
  let usersFollowedsIds = shuffle((await knex.select('id').from('users')).map(user => user.id));

  usersFollowersIds = usersFollowersIds.length > 2 ? usersFollowersIds.slice(0, usersFollowersIds.length / 2) : usersFollowersIds;
  usersFollowedsIds = usersFollowedsIds.length > 2 ? usersFollowedsIds.slice(0, usersFollowedsIds.length / 2) : usersFollowedsIds;

  const items = [];
  usersFollowersIds.forEach(user_follower => {
    usersFollowedsIds.forEach(user_followed => {
      items.push({user_follower, user_followed});
    });
  });

  return knex.insert(items.map(item => factory('subscriptions_users', 1, () => (item)))).into('subscriptions_users');
}

module.exports = {seed};

const {shuffle} = require('./../../app/util');
const factory = require('./../factories');

async function seed(knex) {
  let usersIds = shuffle((await knex.select('id').from('users')).map(user => user.id));
  let albumsIds = shuffle((await knex.select('id').from('albums')).map(album => album.id));

  usersIds = usersIds.length > 2 ? usersIds.slice(0, usersIds.length / 2) : usersIds;
  albumsIds = albumsIds.length > 2 ? albumsIds.slice(0, albumsIds.length / 2) : albumsIds;

  const items = [];
  usersIds.forEach(user_id => {
    albumsIds.forEach(album_id => {
      items.push({user_id, album_id});
    });
  });

  return knex.insert(items.map(item => factory('likes_albums', 1, () => (item)))).into('likes_albums');
}

module.exports = {seed};

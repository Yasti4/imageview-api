import {
  randomItem
} from '../helpers/index';
import User from '../models/user';
import Album from '../models/album';

const limit = 20;
export const seed = (knex) => {
  return knex('subscriptions_albums').del().then(async() => {
    const faker = require('faker/locale/es');
    const items = [];
    const albums = (await Album.get()).toJSON().map(item => item.id);
    const users = (await User.get()).toJSON().map(item => item.id);
    let album_user;
    for (let index = 0; index < limit; index++) {
      do {
        album_user = {
          album_id: randomItem(albums),
          user_id: randomItem(users),
        };
      } while (items.findIndex(item =>
          item.album_id === album_user.album_id && item.user_id && album_user.user_id
        ) !== -1);
      items.push(album_user);
    }
    return knex('subscriptions_albums').insert(items)
      .then(console.log(`Tabla 'subscriptions_albums' Datos`, '\x1b[32mOK\x1b[0m'))
      .catch((error) => console.log(`Tabla 'subscriptions_albums' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`));
  });
};

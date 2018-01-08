import {
  randomItem
} from '../helpers/index';
import User from '../models/user';
import Post from '../models/post';

const limit = 20;
export const seed = (knex) => {
  return knex('subscriptions_users').del().then(async() => {
    const faker = require('faker/locale/es');
    const items = [];
    const users = (await User.get()).toJSON().map(item => item.id);
    let data;
    for (let index = 0; index < limit; index++) {
      do {
        data = {
          user_followed: randomItem(users),
          user_follower: randomItem(users),
        };
      } while (data.user_followed === data.user_follower || items.findIndex(item =>
          item.user_followed === data.user_followed && item.user_follower && data.user_follower
        ) !== -1);
      items.push(data);
    }
    return knex('subscriptions_users').insert(items)
      .then(console.log(`Tabla 'subscriptions_users' Datos`, '\x1b[32mOK\x1b[0m'))
      .catch((error) => console.log(`Tabla 'subscriptions_users' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`));
  });
};

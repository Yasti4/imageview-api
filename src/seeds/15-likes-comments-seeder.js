import {
  randomItem
} from '../helpers/index';
import User from '../models/user';
import Comment from '../models/comment';

const limit = 20;
export const seed = (knex) => {
  return knex('likes_comments').del().then(async() => {
    const faker = require('faker/locale/es');
    const items = [];
    const comments = (await Comment.get()).toJSON().map(item => item.id);
    const users = (await User.get()).toJSON().map(item => item.id);
    let comment_user;
    for (let index = 0; index < limit; index++) {
      do {
        comment_user = {
          comment_id: randomItem(comments),
          user_id: randomItem(users),
        };
      } while (items.findIndex(item =>
          item.comment_id === comment_user.comment_id && item.user_id && comment_user.user_id
        ) !== -1);
      items.push(comment_user);
    }
    return knex('likes_comments').insert(items)
      .then(console.log(`Tabla 'likes_comments' Datos`, '\x1b[32mOK\x1b[0m'))
      .catch((error) => console.log(`Tabla 'likes_comments' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`));
  });
};

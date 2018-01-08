import { randomItem } from '../helpers/index';
import User from '../models/user';
import Post from '../models/post';

const limit = 20;
export const seed = (knex) => {
	return knex('subscriptions_posts').del().then(async () => {
		const faker = require('faker/locale/es');
		const items = [];
		const posts = (await Post.get()).toJSON().map(item => item.id);
		const users = (await User.get()).toJSON().map(item => item.id);
		let post_user;
		for (let index = 0; index < limit; index++) {
			do {
				post_user = {
					post_id: randomItem(posts),
					user_id: randomItem(users),
				};
			} while (items.findIndex(item =>
				item.post_id === post_user.post_id && item.user_id && post_user.user_id
			) !== -1);
			items.push(post_user);
		}
		return knex('subscriptions_posts').insert(items)
			.then(console.log(`Tabla 'subscriptions_posts' Datos`, '\x1b[32mOK\x1b[0m'))
			.catch((error) => console.log(`Tabla 'subscriptions_posts' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`));
	});
};
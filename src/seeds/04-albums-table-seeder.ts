import Visibility from './../models/visibility';
import { randomItem } from './../helpers/index';

const limit = 40;
export const seed = (knex) => {
	return knex('albums').del().then(async () => {
		const faker = require('faker/locale/es');
		const visibilities = (await Visibility.get()).toJSON();
		const now = new Date();
		return knex('albums').insert([...Array(limit)].map(_ => ({
			title: faker.name.findName(),
			description: faker.name.findName(),
			visibility: (<any>randomItem(visibilities)).name,
			created_at: now,
			updated_at: now,
		})))
			.then(console.log(`Tabla 'albums' Datos`, '\x1b[32mOK\x1b[0m'))
			.catch((error) => console.log(`Tabla 'albums' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`));
	});
};

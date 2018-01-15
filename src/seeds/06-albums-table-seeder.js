import Visibility from './../models/visibility';
import { randomItem } from './../helpers/index';
import User from '../models/user';

const limit = 20;
export const seed = (knex) => {
    return knex('albums').del().then(async() => {
        const faker = require('faker/locale/es');
        const visibilities = (await Visibility.get()).toJSON();
        const user = (await User.take(limit).get()).toJSON().map(item => item.id);
        const now = new Date();
        return knex('albums').insert([...Array(limit)].map(_ => ({
                title: faker.name.findName(),
                description: faker.name.findName(),
                visibility: (randomItem(visibilities)).name,
                user_id: user.pop(),
                created_at: now,
                updated_at: now,
            })))
            .then(console.log(`Tabla 'albums' Datos`, '\x1b[32mOK\x1b[0m'))
            .catch((error) => console.log(`Tabla 'albums' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`));
    });
};
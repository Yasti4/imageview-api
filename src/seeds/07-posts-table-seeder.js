import {
    randomItem
} from '../helpers/index';
import Visibility from '../models/visibility';
import Image from '../models/image';
import User from '../models/user';
import Album from '../models/album';

import {
    limit as usersLimitSeeder
} from './05-users-table-seeder';

const limit = 60;
export const seed = (knex) => {
    return knex('posts').del().then(async() => {
        const faker = require('faker/locale/es');
        const visibilities = (await Visibility.get()).toJSON().map(item => item.name);
        const images = (await Image.offset(usersLimitSeeder).get()).toJSON().map(item => item.id);
        const users = (await User.get()).toJSON().map(item => item.id);
        const albums = (await Album.get()).toJSON().map(item => item.id);
        const now = new Date();
        return knex('posts').insert([...Array(limit)].map(item => ({
                title: faker.name.title(),
                description: faker.lorem.sentence(),
                user_id: randomItem(users),
                album_id: randomItem([...albums, null, null, null]),
                image: randomItem(images),
                visibility: randomItem(visibilities),
                enable_comments: randomItem([true, true, true, false]),
                created_at: now,
                updated_at: now,
            })))
            .then(console.log(`Tabla 'posts' Datos`, '\x1b[32mOK\x1b[0m'))
            .catch((error) => {
                console.log(`Tabla 'posts' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`)
            });
    });
};
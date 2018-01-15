import Role from '../models/role';
import Image from '../models/image';

export const limit = 20;
export const seed = (knex) => {
    return knex('users').del().then(async() => {
        const faker = require('faker/locale/es');
        const role = (await Role.where('name', 'user').first()).toJSON().name;
        const avatars = (await Image.take(limit).get()).toJSON().map(item => item.id);
        const now = new Date();
        return knex('users').insert([...Array(limit)].map(item => ({
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                name: faker.name.findName(),
                lastname: faker.name.lastName(),
                image: avatars.pop(),
                role: role,
                created_at: now,
                updated_at: now,
            })))
            .then(console.log(`Tabla 'users' Datos`, '\x1b[32mOK\x1b[0m'))
            .catch((error) => {
                console.log(`Tabla 'users' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`)
            });
    });
};
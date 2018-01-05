import { getRandomData } from '../helpers/index';
import Role from '../models/role';
import Image from '../models/image';

const limit = 1;
export const seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(async() => {
            const faker = require('faker/locale/es');
            // Inserts seed entries
            const datas = [];
            const RoleDatas = await Role.get();
            const ImageDatas = await Image.get();
            for (let index = 0; index < limit; index++) {
                const data = {
                    username: faker.internet.userName(),
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    name: faker.name.findName(),
                    lastname: faker.name.lastName(),
                    image: (await getRandomData(ImageDatas)).attributes.id,
                    role: (await getRandomData(RoleDatas)).attributes.name
                };
                datas.push(data);
            }
            return knex('users').insert(datas)
                .then(console.log(`Tabla 'users' Datos`, '\x1b[32mOK\x1b[0m'))
                .catch((error) => {
                    console.log(`Tabla 'users' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`)
                });
        });
};
import { getRandomData, compareUnique, controlLimitSeeder } from '../helpers/index';
import Album from '../models/album';
import User from '../models/user';

let limit = 1;
export const seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('likes_albums').del()
        .then(async() => {
            const faker = require('faker/locale/es');
            // Inserts seed entries
            const datas = [];
            const albumDatas = await Album.get();
            const userDatas = await User.get();

            const errorLimitInsert = controlLimitSeeder([albumDatas, userDatas], limit);
            if (errorLimitInsert.TheDataIsNotCorrect) {
                if (errorLimitInsert.IsMissingDataLength) {
                    throw new Error(`Tabla 'likes_albums' Data` + `\x1b[31mInsuficientes FK\x1b[0m\n`);
                } else if (errorLimitInsert.IsNotMinimumData) {
                    console.log(`Tabla 'likes_albums' change Limit`, `\x1b[33m${errorLimitInsert.limitMax}\x1b[0m`);
                    limit = errorLimitInsert.limitMax;
                }
            }
            for (let index = 0; index < limit; index++) {
                const data = {
                    albums_id: (await getRandomData(albumDatas)).attributes.id,
                    user_id: (await getRandomData(userDatas)).attributes.id,
                };

                datas.push(data);
            }

            return knex('likes_albums').insert(datas)
                .then(console.log(`Tabla 'likes_albums' Datos`, '\x1b[32mOK\x1b[0m'))
                .catch((error) => {
                    console.log(`Tabla 'likes_albums' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`)
                });
        });
};
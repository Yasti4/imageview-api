import { getRandomData, compareUnique } from '../helpers/index';
import Album from '../models/album';
import User from '../models/user';

const limit = 10;
export const seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('likes_albums').del()
        .then(async() => {
            const faker = require('faker/locale/es');
            // Inserts seed entries
            const datas = [];
            const albumDatas = await Album.get();
            const userDatas = await User.get();
            const errorLimitInsert = (albumDatas.length < limit && userDatas.length < limit) ||
                (albumDatas.length < limit && userDatas.length > limit) ||
                (albumDatas.length > limit && userDatas.length < limit);
            if (errorLimitInsert) {
                throw new Error(`Tabla 'likes_albums' Datos` + `\x1b[31mInsuficientes FK\x1b[0m\n`);
            }
            for (let index = 0; index < limit; index++) {
                let loop = 0;
                const maxLoop = 3;
                let data = {};
                do {
                    data = {
                        albums_id: (await getRandomData(albumDatas)).attributes.id,
                        user_id: (await getRandomData(userDatas)).attributes.id,
                    };
                } while (compareUnique(datas, data, ['albums_id', 'user_id']) || loop++ !== maxLoop);
                if (loop++ !== maxLoop) {
                    datas.push(data);
                }
            }

            return knex('likes_albums').insert(datas)
                .then(console.log(`Tabla 'likes_albums' Datos`, '\x1b[32mOK\x1b[0m'))
                .catch((error) => {
                    console.log(`Tabla 'likes_albums' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`)
                });
        });
};
import { getRandomData, controlLimitSeeder, compareUnique } from '../helpers/index';
import User from '../models/user';
import Post from '../models/post';

let limit = 60;
export const seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('subscriptions_posts').del()
        .then(async() => {
            const faker = require('faker/locale/es');
            // Inserts seed entries
            const datas = [];
            const postDatas = await Post.get();
            const userDatas = await User.get();

            const errorLimitInsert = controlLimitSeeder([postDatas, userDatas], limit);
            if (errorLimitInsert.TheDataIsNotCorrect) {
                if (errorLimitInsert.IsMissingDataLength) {
                    throw new Error(`Tabla 'subscriptions_posts' Data` + `\x1b[31mInsuficientes FK\x1b[0m\n`);
                } else if (errorLimitInsert.IsNotMinimumData) {
                    console.log(`Tabla 'subscriptions_posts' change Limit`, `\x1b[33m${errorLimitInsert.limitMax}\x1b[0m`);
                    limit = errorLimitInsert.limitMax;
                }
            }
            for (let index = 0; index < limit; index++) {

                let data = {};
                do {
                    data = {
                        post_id: (await getRandomData(postDatas)).attributes.id,
                        user_id: (await getRandomData(userDatas)).attributes.id,
                    };
                } while (compareUnique(datas, data, ['post_id', 'user_id']));
                datas.push(data);
            }

            return knex('subscriptions_posts').insert(datas)
                .then(console.log(`Tabla 'subscriptions_posts' Datos`, '\x1b[32mOK\x1b[0m'))
                .catch((error) => {
                    console.log(`Tabla 'subscriptions_posts' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`)
                });
        });
};
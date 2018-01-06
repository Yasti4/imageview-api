import { getRandomData, controlLimitSeeder, compareUnique } from '../helpers/index';
import User from '../models/user';
import Post from '../models/post';

let limit = 60;
export const seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('subscriptions_users').del()
        .then(async() => {
            const faker = require('faker/locale/es');
            // Inserts seed entries
            const datas = [];

            const userDatas = await User.get();

            const errorLimitInsert = controlLimitSeeder([userDatas], limit);
            if (errorLimitInsert.TheDataIsNotCorrect) {
                if (errorLimitInsert.IsMissingDataLength) {
                    throw new Error(`Tabla 'subscriptions_users' Data` + `\x1b[31mInsuficientes FK\x1b[0m\n`);
                } else if (errorLimitInsert.IsNotMinimumData) {
                    console.log(`Tabla 'subscriptions_users' change Limit`, `\x1b[33m${errorLimitInsert.limitMax}\x1b[0m`);
                    limit = errorLimitInsert.limitMax;
                }
            }
            for (let index = 0; index < limit; index++) {

                let data = {};
                do {
                    data = {
                        user_followed: (await getRandomData(userDatas)).attributes.id,
                        user_follower: (await getRandomData(userDatas)).attributes.id
                    };
                } while (compareUnique(datas, data, ['user_followed', 'user_followed']) && data.user_followed !== data.user_follower);
                datas.push(data);
            }

            return knex('subscriptions_users').insert(datas)
                .then(console.log(`Tabla 'subscriptions_users' Datos`, '\x1b[32mOK\x1b[0m'))
                .catch((error) => {
                    console.log(`Tabla 'subscriptions_users' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`)
                });
        });
};
import Post from '../models/post';
import Tag from '../models/tag';
import { getRandomData, compareUnique, controlLimitSeeder } from '../helpers/index';

let limit = 3;
export const seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('post_tags').del()
        .then(async() => {
            const faker = require('faker/locale/es');
            // Inserts seed entries
            const datas = [];
            const postDatas = await Post.get();
            const tagDatas = await Tag.get();

            const errorLimitInsert = controlLimitSeeder([postDatas, tagDatas], limit);
            if (errorLimitInsert.TheDataIsNotCorrect) {
                if (errorLimitInsert.IsMissingDataLength) {
                    throw new Error(`Tabla 'post_tags' Data` + `\x1b[31mInsuficientes FK\x1b[0m\n`);
                } else if (errorLimitInsert.IsNotMinimumData) {
                    console.log(`Tabla 'post_tags' change Limit`, `\x1b[33m${errorLimitInsert.limitMax}\x1b[0m`);
                    limit = errorLimitInsert.limitMax;
                }
            }

            for (let index = 0; index < limit; index++) {

                const data = {
                    post_id: (await getRandomData(postDatas)).attributes.id,
                    tag_id: (await getRandomData(tagDatas)).attributes.id,
                };

                datas.push(data);
            }
            return knex('post_tags').insert(datas)
                .then(console.log(`Tabla 'post_tags' Datos`, '\x1b[32mOK\x1b[0m'))
                .catch((error) => {
                    console.log(`Tabla 'post_tags' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`)
                });
        });
};
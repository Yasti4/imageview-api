import Post from '../models/post';
import Tag from '../models/tag';
import { getRandomData, compareUnique } from '../helpers/index';

const limit = 20;
export const seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('post_tags').del()
        .then(async() => {
            const faker = require('faker/locale/es');
            // Inserts seed entries
            const datas = [];
            const postDatas = await Post.get();
            const tagDatas = await Tag.get();
            const errorLimitInsert = (postDatas.length < limit && tagDatas.length < limit) ||
                (postDatas.length < limit && tagDatas.length > limit) ||
                (postDatas.length > limit && tagDatas.length < limit);
            if (errorLimitInsert) {
                throw new Error(`Tabla 'post_tags' Datos` + `\x1b[31mInsuficientes FK\x1b[0m\n`);
            }
            for (let index = 0; index < limit; index++) {
                let loop = 0;
                const maxLoop = 3;
                let data = {};
                do {
                    data = {
                        post_id: (await getRandomData(postDatas)).attributes.id,
                        tag_id: (await getRandomData(tagDatas)).attributes.id,
                    };
                } while (compareUnique(datas, data, ['post_id', 'tag_id']) || loop++ !== maxLoop);
                if (loop++ !== maxLoop) {
                    datas.push(data);
                }
            }
            return knex('post_tags').insert(datas)
                .then(console.log(`Tabla 'post_tags' Datos`, '\x1b[32mOK\x1b[0m'))
                .catch((error) => {
                    console.log(`Tabla 'post_tags' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`)
                });
        });
};
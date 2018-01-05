import { getRandomData } from '../helpers/index';
import Visibility from '../models/visibility';
import Image from '../models/image';
import User from '../models/user';
import Album from '../models/album';

const limit = 1;
export const seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('posts').del()
        .then(async() => {
            const faker = require('faker/locale/es');
            // Inserts seed entries
            const datas = [];
            const visibilityDatas = await Visibility.get();
            const ImageDatas = await Image.get();
            const UserDatas = await User.get();

            const AlbumDatas = await Album.get();
            for (let index = 0; index < limit; index++) {
                const data = {
                    title: faker.name.title(),
                    descriptions: faker.lorem.sentence(),
                    user_id: (await getRandomData(UserDatas)).attributes.id,
                    album_id: (await getRandomData(AlbumDatas)).attributes.id,
                    image: (await getRandomData(ImageDatas)).attributes.id,
                    visibility: (await getRandomData(visibilityDatas)).attributes.name,
                    enable_comments: true
                };
                datas.push(data);
            }
            return knex('posts').insert(datas)
                .then(console.log(`Tabla 'posts' Datos`, '\x1b[32mOK\x1b[0m'))
                .catch((error) => {
                    console.log(`Tabla 'posts' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`)
                });
        });
};
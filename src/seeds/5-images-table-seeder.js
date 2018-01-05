const limit = 20;
export const seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('images').del()
        .then(() => {
            const faker = require('faker/locale/es');
            // Inserts seed entries
            const datas = [];
            for (let index = 0; index < limit; index++) {
                const data = {
                    small: null,
                    medium: null,
                    large: faker.image.imageUrl(),
                    huge: faker.image.imageUrl(),
                };
                datas.push(data);

            }
            return knex('images').insert(datas)
                .then(console.log(`Tabla 'images' Datos`, '\x1b[32mOK\x1b[0m'))
                .catch((error) => {
                    console.log(`Tabla 'images' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`)
                });
        });
};
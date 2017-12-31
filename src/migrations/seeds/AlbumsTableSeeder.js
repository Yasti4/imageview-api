const limit = 1;
exports.seed = function(knex, Promise) {
    const Visibility = require('../../models/Visibility');
    const a = Visibility.fetchAll()
        .then(function(articles) {
            res.send(articles.toJSON());
        }).catch(function(error) {
            console.log(error);
            res.send('An error occured');
        });
    console.log(a);
    // // Deletes ALL existing entries
    // return knex('albums').del()
    //     .then(() => {
    //         const faker = require('faker/locale/es');
    //         // Inserts seed entries
    //         const datas = [];
    //         for (let index = 0; index < limit; index++) {
    //             const data = {
    //                 title: faker.name.title(),
    //                 description: 'description',
    //                 visibility: '///TODO',
    //                 created_at: Date.now(),
    //                 updated_at: null,
    //                 deleted_at: null
    //             };
    //             if (datas.findIndex(value => value.name === data.name) === -1) {
    //                 datas.push(data);
    //             }
    //         }
    //         return knex('albums').insert(datas)
    //             .then(console.log(`Tabla 'albums' Datos`, '\x1b[32mOK\x1b[0m'))
    //             .catch((error) => {
    //                 console.log(`Tabla 'albums' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`)
    //             });
    //     });
};
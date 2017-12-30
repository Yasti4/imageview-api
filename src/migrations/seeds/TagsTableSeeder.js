const limit = 30;
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('tags').del()
        .then(() => {
            const faker = require('faker/locale/es');
            // Inserts seed entries
            const data = [];
            for (let index = 0; index < limit; index++) {
                data.push({ name: faker.name.findName() });
            }
            return knex('tags').insert(data)
                .then(console.log(`Tabla 'tags' Datos OK \n`))
                .catch((error) => {
                    console.log(`Tabla 'tags' Datos Fail\n${error}`)
                });
        });
};
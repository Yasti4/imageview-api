const limit = 30;
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('roles').del()
        .then(() => {
            const faker = require('faker/locale/es');
            // Inserts seed entries
            const data = [];
            for (let index = 0; index < limit; index++) {
                data.push({ name: faker.name.findName() });
            }
            return knex('roles').insert(data)
                .then(console.log(`Tabla 'roles' Datos OK \n`))
                .catch((error) => {
                    console.log(`Tabla 'roles' Datos Fail\n${error}`)
                });
        });
};
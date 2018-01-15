const limit = 60;
export const seed = (knex) => {
  return knex('images').del().then(() => {
    const faker = require('faker/locale/es');
    return knex('images').insert([...Array(limit)].map(item => ({
        small: faker.image.imageUrl(),
        medium: faker.image.imageUrl(),
        large: null,
      })))
      .then(console.log(`Tabla 'images' Datos`, '\x1b[32mOK\x1b[0m'))
      .catch((error) => {
        console.log(`Tabla 'images' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`)
      });
  });
};

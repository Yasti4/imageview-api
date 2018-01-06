const limit = 30;
export const seed = function (knex, Promise) {
	// Deletes ALL existing entries
	return knex('roles').del()
		.then(() => {
			const faker = require('faker/locale/es');
			// Inserts seed entries
			const datas = [];
			for (let index = 0; index < limit; index++) {
				const data = { name: faker.name.findName() };
				if (datas.findIndex(value => value.name === data.name) === -1) {
					datas.push(data);
				}
			}
			return knex('roles').insert(datas)
				.then(console.log(`Tabla 'roles' Datos`, '\x1b[32mOK\x1b[0m'))
				.catch((error) => {
					console.log(`Tabla 'roles' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`)
				});
		});
};
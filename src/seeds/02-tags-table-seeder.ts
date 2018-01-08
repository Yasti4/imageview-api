const limit = 40;
export const seed = (knex) => {
	return knex('tags').del().then(() => {
		const faker = require('faker/locale/es');
		const items = [];
		
		for (let i = 0; i < limit;) {
			const name = faker.name.findName();
			if (items.findIndex(value => value.name === name) === -1) {
				items.push({ name });
				i++;
			}
		}

		return knex('tags').insert(items)
			.then(console.log(`Tabla 'tags' Datos`, '\x1b[32mOK\x1b[0m'))
			.catch((error) => {
				console.log(`Tabla 'tags' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`)
			});
	});
};
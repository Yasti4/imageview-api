export const seed = (knex) => {
	return knex('visibilities').del().then(() => {
		return knex('visibilities').insert([
			{ name: 'public' },
			{ name: 'protected' },
			{ name: 'private' },
		]).then(console.log(`Tabla 'visibilities' Datos`, '\x1b[32mOK\x1b[0m'))
			.catch((error) => console.log(`Tabla 'visibilities' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`))
	});
}
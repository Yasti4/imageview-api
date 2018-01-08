export const seed = (knex) => {
	return knex('roles').del().then(() => {
			return knex('roles').insert([
				{ name: 'admin' },
				{ name: 'user' }
			]).then(console.log(`Tabla 'roles' Datos`, '\x1b[32mOK\x1b[0m'))
				.catch((error) => console.log(`Tabla 'roles' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`));
		});
};
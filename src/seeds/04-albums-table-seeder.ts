import Visibility from '../models/visibility';
import { getRandomData, controlLimitSeeder } from '../helpers/index';

let limit = 2;
export const seed = function (knex, Promise) {
	// Deletes ALL existing entries
	return knex('albums').del()
		.then(async () => {
			const faker = require('faker/locale/es');
			// Inserts seed entries
			const datas = [];
			const visibilityDatas = await Visibility.get();
			const errorLimitInsert = controlLimitSeeder([visibilityDatas], limit);
            
			if (errorLimitInsert.TheDataIsNotCorrect) {
				if (errorLimitInsert.IsMissingDataLength) {
						throw new Error(`Tabla 'albums' Data` + `\x1b[31mInsuficientes FK\x1b[0m\n`);
				} else if (errorLimitInsert.IsNotMinimumData) {
						console.log(`Tabla 'albums' change Limit`, `\x1b[33m${errorLimitInsert.limitMax}\x1b[0m`);
						limit = errorLimitInsert.limitMax;
				}
			}
			for (let index = 0; index < limit; index++) {
				const data = { 
          title: faker.name.findName(),
          description: faker.name.findName(),
          visibility: (await getRandomData(visibilityDatas)).attributes.name
        };
					datas.push(data);
			}
			return knex('albums').insert(datas)
				.then(console.log(`Tabla 'albums' Datos`, '\x1b[32mOK\x1b[0m'))
				.catch((error) => {
					console.log(`Tabla 'albums' Datos`, `\x1b[31mFAIL\x1b[0m\n${error}`)
				});
		});
};




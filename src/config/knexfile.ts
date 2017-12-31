import * as dotenv from 'dotenv';
const env = dotenv.config({ path: './../../.env' }).parsed;

export default {
	development: {
		client: env.DB_CONNECTION,
		connection: {
			host: env.DB_HOST,
			user: env.DB_USERNAME,
			password: env.DB_PASSWORD,
			database: env.DB_DATABASE
		},
		migrations: {
			directory: './../migrations',
			tableName: 'migrations'
		},
		seeds: {
			directory: './../seeds'
		}
	}
};
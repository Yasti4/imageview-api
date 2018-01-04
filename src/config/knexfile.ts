import * as dotenv from 'dotenv';
dotenv.load();

export const development = {
	client: process.env.DB_CONNECTION,
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE
	},
	migrations: {
		directory: 'src/migrations',
		tableName: 'migrations'
	},
	seeds: {
		directory: 'src/seeds'
	}
};
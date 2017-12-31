const dotenv = require('dotenv');
const env = dotenv.config().parsed;

module.exports = {
	development: {
		client: env.DB_CONNECTION,
		connection: {
			host: env.DB_HOST,
			user: env.DB_USERNAME,
			password: env.DB_PASSWORD,
			database: env.DB_DATABASE
		},
		migrations: {
			directory: 'dist/migrations',
			tableName: 'migrations'
		},
		seeds: {
			directory: 'dist/seeds'
		}
	}
};
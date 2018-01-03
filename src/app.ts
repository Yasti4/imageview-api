import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as graphqlHTTP from 'express-graphql';
import * as mysql from 'mysql';
import * as dotenv from 'dotenv'
import * as graphqlOptions from './graphql';

dotenv.load();
mysql.createConnection({
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD
}).connect((err) => {
	if (err) throw Error('MySQL not connected.');
	const app = express();
	app.use(bodyParser.json({ type: 'application/json' }));
	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Headers', 'Accept,Content-Type,Authorization');
		res.setHeader('Access-Control-Allow-Methods', '*');
		next();
	});
	app.use('/graphql', graphqlHTTP(graphqlOptions));
	app.listen(process.env.APP_PORT, (err) => {
		if (err) throw new Error('HTTP not enabled.');
		console.log(`Server running at ${process.env.APP_URL}:${process.env.APP_PORT}`);
	});
});
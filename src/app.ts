import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as graphqlHTTP from 'express-graphql';
import * as mysql from 'mysql';
import * as dotenv from 'dotenv'
import * as graphqlOptions from './graphql';
import User from './models/user';

function pruebas() {
	// start bookshelf tests
	(async function () {
		const user = await User.where('id', 122).with('comments').first();
		console.log( user.toJSON());
	})()
	// end bookshelf tests
};

dotenv.load();
const app = express();
app.use(bodyParser.json({ type: 'application/json' }));
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Accept,Content-Type,Authorization');
	res.setHeader('Access-Control-Allow-Methods', '*');
	next();
});
app.use('/graphql', graphqlHTTP(graphqlOptions));
const server = app.listen(process.env.APP_PORT, async (err) => {
	if (err) throw new Error('HTTP not enabled.');
	console.log(`ImageView server running at ${process.env.APP_URL}:${process.env.APP_PORT}`);
	pruebas();
});
const shutdownFn = () => {
	server.close(() => {
		console.log('ImageView server closed.');
		process.exit();
	});
	setTimeout(() => process.exit(), 10000);
};
process.on('SIGTERM' /* listen for TERM signal .e.g. kill  */, shutdownFn);
process.on('SIGINT' /* listen for INT signal e.g. Ctrl-C */, shutdownFn);
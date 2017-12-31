import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as graphqlHTTP from 'express-graphql';
import * as mysql from 'mysql';

import env from './env';
import * as graphqlOptions from './graphql';

const app = express();
const db = mysql.createConnection(env.db);

app.use(bodyParser.json({ type: 'application/json' }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Accept,Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});
app.use('/graphql', graphqlHTTP(graphqlOptions));

db.connect((err) => {
    if (err) throw err;
    console.log(`MySQL connected...`);
    app.listen(env.app.port, (err) => {
        if (err) throw err;
        console.log('HTTP enabled...')
    });
});
import express from 'express';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import mysql from 'mysql';
import { bookshelf } from "./config/database";
// import knex from 'knex';
// import knexfile from '../knexfile';
// import bookshelf from 'bookshelf';
// import bookshelf_eloquent from 'bookshelf-eloquent';

// bookshelf.bookshelf_eloquent;
// knex.knexfile;


// var knex = require('knex')(knexfile);
// var bookshelf = module.exports = require('bookshelf')(knex)
// bookshelf.plugin('bookshelf-eloquent')


import env from './env';
import graphqlOptions from './graphql';

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
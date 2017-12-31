"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql");
const mysql = require("mysql");
const env_1 = require("./env");
const graphqlOptions = require("./graphql");
const app = express();
const db = mysql.createConnection(env_1.default.db);
app.use(bodyParser.json({ type: 'application/json' }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Accept,Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});
app.use('/graphql', graphqlHTTP(graphqlOptions));
db.connect((err) => {
    if (err)
        throw err;
    console.log(`MySQL connected...`);
    app.listen(env_1.default.app.port, (err) => {
        if (err)
            throw err;
        console.log('HTTP enabled...');
    });
});

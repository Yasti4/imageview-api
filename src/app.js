'use strict';

const dotenv = require('dotenv');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const {
    graphqlExpress,
    graphiqlExpress
} = require('apollo-server-express');

class App {

    constructor(fn) {
        dotenv.load();
        this.isDevelopment = process.env.NODE_ENV === 'development';
        this.app = express();
        this.config();
        this.run(fn);
    }

    config() {
        this.app.use(compression());
        this.app.use('/graphql', bodyParser.json(), graphqlExpress({
            schema: require('./schema'),
            context: {
                db: require('./models')
            },
            debug: this.isDevelopment,
            tracing: this.isDevelopment,
            cacheControl: true
        }));
        if (this.isDevelopment) {
            this.app.use('/graphiql', graphiqlExpress({
                endpointURL: '/graphql'
            }));
        }
    }

    run(fn) {
        this.app.listen(process.env.APP_PORT, (err) => {
            if (err) throw err;
            console.log(`Running at ${process.env.APP_URL}:${process.env.APP_PORT}`);
            fn && fn();
        });
    }

}

module.exports = new App(async() => {
    // console.log('\x1Bc');

    // BUSCAR

    // let users = await User.findAll({ where: { id: 1 }, raw: true });
    // ELIMINAR
    // const users = await User.destroy({ where: { id: 13 } });

    // const { User } = require('./models');
    // const role = await Role.find({
    //     where: { name: 'user' },
    //     include: [{
    //         model: User,
    //         as: 'users'
    //     }]
    // });
    // console.log((await User.find({
    //     where: { id: 1 },
    //     include: [{
    //         model: User,
    //         as: 'followed'
    //     }]
    // })).toJSON());
    // console.log(role.toJSON());
    // CREAR
    // const role = await Role.create({ name: Math.random() * 123 + 'abc' });
    // const user = await User.find({ where: { id: 1 } });
    // const a = await user.update({ name: 'denis' });
    /* Start Callback */
    // const User = require('./models/user');
    // const user = await User.where('id', 1).with('posts').first();
    // console.log(user ? user.toJSON() : '...User not found...');
    /* End Callback */
}).app;
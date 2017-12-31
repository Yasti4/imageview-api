import * as fs from 'fs';
import * as knexfile from '../knexfile';
import app from './config/app';

export default {
    db: {
        host: knexfile.dev.connection.host,
        user: knexfile.dev.connection.user,
        password: knexfile.dev.connection.password,
        database: knexfile.dev.connection.database
    },
    app: {
        url: app.url,
        port: app.port,
        token: app.token
    }
};
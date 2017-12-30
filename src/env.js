import fs from 'fs';
import knexfile from '../knexfile';

const app = JSON.parse(fs.readFileSync(`${__dirname}/config/app.json`));

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
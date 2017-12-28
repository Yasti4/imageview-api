import fs from 'fs';

const database = JSON.parse(fs.readFileSync(`${__dirname}/config/database.json`));
const app = JSON.parse(fs.readFileSync(`${__dirname}/config/app.json`));

export default {
    db: {
        host: database.dev.host,
        user: database.dev.user,
        password: database.dev.password,
        database: database.dev.database
    },
    app: {
        url: app.url,
        port: app.port,
        token: app.token
    }
};
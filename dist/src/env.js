"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knexfile = require("../knexfile");
const app_1 = require("./config/app");
exports.default = {
    db: {
        host: knexfile.dev.connection.host,
        user: knexfile.dev.connection.user,
        password: knexfile.dev.connection.password,
        database: knexfile.dev.connection.database
    },
    app: {
        url: app_1.default.url,
        port: app_1.default.port,
        token: app_1.default.token
    }
};

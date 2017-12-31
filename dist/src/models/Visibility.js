"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
class Visibility extends database_1.default.Model {
    get tableName() { return 'visibilities'; }
    get hasTimestamps() { return false; }
    get defaults() {
        return {
            property1: 'name',
        };
    }
}
exports.default = Visibility;

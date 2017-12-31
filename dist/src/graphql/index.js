"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const user_type_1 = require("./types/user.type");
const user_query_1 = require("./queries/user.query");
const user_resolver_1 = require("./resolvers/user.resolver");
const Types = [user_type_1.default].join('\n');
const Inputs = [].join('\n');
const Queries = [user_query_1.default].join('\n');
const Mutations = [].join('\n');
const Resolvers = Object.assign({}, user_resolver_1.default);
exports.default = {
    schema: graphql_1.buildSchema(`
        ${Types}
        ${Inputs}
        type Query {
            ${Queries}
        }
    `),
    rootValue: Resolvers,
    graphiql: true
};

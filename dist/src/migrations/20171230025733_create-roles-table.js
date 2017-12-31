exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('roles', function (table) {
            table.string('name').primary();
        }).then(console.log(`Table 'roles' has be created`))
    ]);
};
exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('roles')
            .then(console.log(`Table 'roles' has be deleted`))
    ]);
};

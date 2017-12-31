exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('visibilities', function (table) {
            table.string('name').primary();
        }).then(console.log(`Table 'visibilities' has be created`))
    ]);
};
exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('visibilities')
            .then(console.log(`Table 'visibilities' has be deleted`))
    ]);
};

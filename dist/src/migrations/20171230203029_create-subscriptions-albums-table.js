exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('subscriptions_albums', function (table) {
            table.bigIncrements('id').unsigned().primary();
            table.integer('album_id').unsigned().notNullable()
                .references('id')
                .inTable('albums');
            table.integer('user_id').unsigned().notNullable()
                .references('id')
                .inTable('users');
        }).then(console.log(`Table 'subscriptions_albums' has be created`))
    ]);
};
exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('subscriptions_albums')
            .then(console.log(`Table 'subscriptions_albums' has be deleted`))
    ]);
};

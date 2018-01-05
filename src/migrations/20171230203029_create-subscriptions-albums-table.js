exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('subscriptions_albums', function(table) {
            table.bigIncrements('id').unsigned().primary();
            table.integer('album_id').unsigned().notNullable()
                .references('id')
                .inTable('albums')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.integer('user_id').unsigned().notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.unique(['album_id', 'user_id']);
        }).then(console.log(`Table 'subscriptions_albums' has be created`))
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('subscriptions_albums')
        .then(console.log(`Table 'subscriptions_albums' has be deleted`))
    ])
};
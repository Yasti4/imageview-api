exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('likes_albums', function(table) {
            table.bigInteger('id').unsigned().primary();
            table.integer('albums_id').unsigned().notNullable()
                .references('id')
                .inTable('albums');
            table.integer('user_id').unsigned().notNullable()
                .references('id')
                .inTable('users');
        }).then(console.log(`Table 'likes_albums' has be created`))
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('likes_albums')
        .then(console.log(`Table 'likes_albums' has be deleted`))
    ])
};
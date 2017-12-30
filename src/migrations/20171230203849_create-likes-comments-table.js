exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('likes_comments', function(table) {
            table.bigInteger('id').unsigned().primary();
            table.integer('comment_id').unsigned().notNullable()
                .references('id')
                .inTable('comments');
            table.integer('user_id').unsigned().notNullable()
                .references('id')
                .inTable('users');
        }).then(console.log(`Table 'likes_comments' has be created`))
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('likes_comments')
        .then(console.log(`Table 'likes_comments' has be deleted`))
    ])
};
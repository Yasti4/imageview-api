exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('likes_comments', function(table) {
            table.bigIncrements('id').unsigned().primary();
            table.integer('comment_id').unsigned().notNullable()
                .references('id')
                .inTable('comments')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.integer('user_id').unsigned().notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        }).then(console.log(`Table 'likes_comments' has be created`))
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('likes_comments')
        .then(console.log(`Table 'likes_comments' has be deleted`))
    ])
};
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('likes_posts', function(table) {
            table.bigIncrements('id').unsigned().primary();
            table.integer('post_id').unsigned().notNullable()
                .references('id')
                .inTable('posts')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.integer('user_id').unsigned().notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.unique(['post_id', 'user_id']);
        }).then(console.log(`Table 'likes_posts' has be created`))
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('likes_posts')
        .then(console.log(`Table 'likes_posts' has be deleted`))
    ])
};
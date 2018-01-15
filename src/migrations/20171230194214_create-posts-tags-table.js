exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('posts_tags', function(table) {
            table.bigIncrements('id').unsigned().primary();
            table.integer('post_id').unsigned().notNullable()
                .references('id')
                .inTable('posts')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.integer('tag_id').unsigned().notNullable()
                .references('id')
                .inTable('tags')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.unique(['post_id', 'tag_id']);
        }).then(console.log(`Table 'posts_tags' has be created`))
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('posts_tags')
        .then(console.log(`Table 'posts_tags' has be deleted`))
    ])
};
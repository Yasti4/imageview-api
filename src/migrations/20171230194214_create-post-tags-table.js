exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('post_tags', function(table) {
            table.bigInteger('id').unsigned().primary();
            table.integer('post_id').unsigned().notNullable()
                .references('id')
                .inTable('posts');
            table.integer('tag_id').unsigned().notNullable()
                .references('id')
                .inTable('tags');
        }).then(console.log(`Table 'post_tags' has be created`))
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('post_tags')
        .then(console.log(`Table 'post_tags' has be deleted`))
    ])
};
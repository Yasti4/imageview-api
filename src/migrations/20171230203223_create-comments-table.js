exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('comments', function(table) {
            table.increments('id').unsigned().primary();
            table.string('comment').notNullable();
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
            table.timestamp('created_at').nullable();
            table.timestamp('updated_at').nullable();
            table.timestamp('deleted_at').nullable();
        }).then(console.log(`Table 'comments' has be created`))
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('comments')
        .then(console.log(`Table 'comments' has be deleted`))
    ])
};
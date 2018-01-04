exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('posts', function(table) {
            table.increments('id').unsigned().primary();
            table.string('title').notNullable();
            table.string('descriptions').nullable();
            table.integer('user_id').unsigned().notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.integer('album_id').unsigned().notNullable()
                .references('id')
                .inTable('albums')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.integer('image').unsigned().notNullable()
                .references('id')
                .inTable('images')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.string('visibility').notNullable()
                .references('name')
                .inTable('visibilities')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.boolean('enable_comments').notNullable()
                .defaultTo(true);
            table.timestamp('created_at').nullable();
            table.timestamp('updated_at').nullable();
            table.timestamp('deleted_at').nullable();
        }).then(console.log(`Table 'posts' has be created`))
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('posts')
        .then(console.log(`Table 'posts' has be deleted`))
    ])
};
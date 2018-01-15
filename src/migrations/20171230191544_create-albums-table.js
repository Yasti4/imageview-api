exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('albums', function(table) {
            table.increments('id').primary().unsigned();
            table.string('title').notNullable();
            table.string('description').nullable();
            table.integer('user_id').unsigned().notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.string('visibility').notNullable()
                .references('name')
                .inTable('visibilities')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.timestamp('created_at').nullable();
            table.timestamp('updated_at').nullable();
            table.timestamp('deleted_at').nullable();
        }).then(console.log(`Table 'albums' has be created`))
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('albums')
        .then(console.log(`Table 'albums' has be deleted`))
    ])
};
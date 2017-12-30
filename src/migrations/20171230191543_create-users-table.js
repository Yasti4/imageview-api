exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('users', function(table) {
            table.increments('id').unsigned().primary();
            table.string('username').notNullable().unique();
            table.string('email').notNullable().unique();
            table.string('password').notNullable();
            table.string('name').nullable();
            table.string('lastname').nullable();
            table.integer('image').unsigned().notNullable()
                .references('id')
                .inTable('images');
            table.string('role').notNullable()
                .references('name')
                .inTable('roles');
            table.timestamp('created_at').nullable();
            table.timestamp('updated_at').nullable();
            table.timestamp('deleted_at').nullable();
        }).then(console.log(`Table 'users' has be created`))
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('users')
        .then(console.log(`Table 'users' has be deleted`))
    ])
};
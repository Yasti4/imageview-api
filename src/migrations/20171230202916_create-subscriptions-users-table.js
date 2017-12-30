exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('subscriptions_users', function(table) {
            table.bigIncrements('id').unsigned().primary();
            table.integer('user_followed').unsigned().notNullable()
                .references('id')
                .inTable('users');
            table.integer('user_follower').unsigned().notNullable()
                .references('id')
                .inTable('users');
        }).then(console.log(`Table 'subscriptions_users' has be created`))
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('subscriptions_users')
        .then(console.log(`Table 'subscriptions_users' has be deleted`))
    ])
};
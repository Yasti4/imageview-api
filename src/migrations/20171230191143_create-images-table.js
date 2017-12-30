exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('images', function(table) {
            table.increments('id').primary().unsigned();
            table.string('small').nullable();
            table.string('medium').nullable();
            table.string('large').notNullable();
            table.string('huge').notNullable();
        }).then(console.log(`Table 'images' has be created`))
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('images')
        .then(console.log(`Table 'images' has be deleted`))
    ])
};
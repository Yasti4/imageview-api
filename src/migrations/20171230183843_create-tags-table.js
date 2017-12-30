exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('tags', function(table) {
            table.increments('id').primary().unsigned();
            table.string('name').unique().notNullable();
        }).then(console.log(`Table 'tags' has be created`))
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('tags')
        .then(console.log(`Table 'tags' has be deleted`))
    ])
};
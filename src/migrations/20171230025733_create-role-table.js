exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('test', function(table) {
            table.string('username');
            table.string('password');
            table.timestamps();
        }).then(console.log('Table test has be created'))
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('test')
        .then(console.log('Table test has be deleted'))
    ])
};
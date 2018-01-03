const limit = 1;
exports.seed = function (knex, Promise) {
    const Visibility = require('../../models/Visibility');
    const a = Visibility.fetchAll()
        .then(function (articles) {
        res.send(articles.toJSON());
    }).catch(function (error) {
        console.log(error);
        res.send('An error occured');
    });
    console.log(a);
};

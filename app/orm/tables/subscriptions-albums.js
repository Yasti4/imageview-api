module.exports = function loadTables(orm) {
  orm.defineTable({
    name: 'subscriptions_albums',

    props: {
      key: 'id',
      autoId: false,
      timestamps: false
    }
  });
}

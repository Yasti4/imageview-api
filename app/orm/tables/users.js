module.exports = function loadTables(orm) {
  orm.defineTable({
    name: 'users',

    props: {
      key: 'id',
      autoId: false,
      timestamps: true
    }
  });
}

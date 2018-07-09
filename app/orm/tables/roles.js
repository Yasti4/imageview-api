module.exports = function loadTables(orm) {
  orm.defineTable({
    name: 'roles',

    props: {
      key: 'name',
      autoId: false,
      timestamps: false
    }
  });
}

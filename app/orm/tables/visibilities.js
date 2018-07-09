module.exports = function loadTables(orm) {
  orm.defineTable({
    name: 'visiblities',

    props: {
      key: 'name',
      autoId: false,
      timestamps: false
    }
  });
}

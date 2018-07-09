module.exports = function loadTables(orm) {
  orm.defineTable({
    name: 'privacities',

    props: {
      key: 'id',
      autoId: false,
      timestamps: false
    }
  });
}

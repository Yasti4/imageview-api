module.exports = function loadTables(orm) {
  orm.defineTable({
    name: 'posts_tags',

    props: {
      key: 'id',
      autoId: false,
      timestamps: false
    }
  });
}

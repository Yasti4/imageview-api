module.exports = function loadTables(orm) {
  orm.defineTable({
    name: 'likes_posts',

    props: {
      key: 'id',
      autoId: false,
      timestamps: false
    }
  });
}

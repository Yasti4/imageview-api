module.exports = function loadTables(orm) {
  orm.defineTable({
    name: 'likes_comments',

    props: {
      key: 'id',
      autoId: false,
      timestamps: false
    }
  });
}

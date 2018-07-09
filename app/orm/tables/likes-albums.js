module.exports = function loadTables(orm) {
  orm.defineTable({
    name: 'likes_albums',

    props: {
      key: 'id',
      autoId: false,
      timestamps: false
    }
  });
}

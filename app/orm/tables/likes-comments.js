export default function loadTables(orm) {
  orm.defineTable({
    name: 'likes_comments',

    props: {
      key: 'id',
      autoId: true,
      timestamps: false
    }
  });
}

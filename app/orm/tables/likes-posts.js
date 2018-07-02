export default function loadTables(orm) {
  orm.defineTable({
    name: 'likes_posts',

    props: {
      key: 'id',
      autoId: true,
      timestamps: false
    }
  });
}

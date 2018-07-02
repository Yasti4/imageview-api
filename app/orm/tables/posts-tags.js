export default function loadTables(orm) {
  orm.defineTable({
    name: 'posts_tags',

    props: {
      key: 'id',
      autoId: true,
      timestamps: false
    }
  });
}

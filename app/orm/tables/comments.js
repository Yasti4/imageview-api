export default function loadTables(orm) {
  orm.defineTable({
    name: 'comments',

    props: {
      key: 'id',
      autoId: true,
      timestamps: true
    }
  });
}

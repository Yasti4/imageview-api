export default function loadTables(orm) {
  orm.defineTable({
    name: 'images',

    props: {
      key: 'id',
      autoId: false,
      timestamps: true
    }
  });
}

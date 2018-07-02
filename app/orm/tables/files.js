export default function loadTables(orm) {
  orm.defineTable({
    name: 'files',

    props: {
      key: 'id',
      autoId: true,
      timestamps: true
    }
  });
}

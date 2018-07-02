export default function loadTables(orm) {
  orm.defineTable({
    name: 'privacities',

    props: {
      key: 'id',
      autoId: true,
      timestamps: false
    }
  });
}

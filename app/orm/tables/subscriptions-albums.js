export default function loadTables(orm) {
  orm.defineTable({
    name: 'subscriptions_albums',

    props: {
      key: 'id',
      autoId: true,
      timestamps: false
    }
  });
}

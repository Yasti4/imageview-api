export default function loadTables(orm) {
  orm.defineTable({
    name: 'subscriptions_users',

    props: {
      key: 'id',
      autoId: true,
      timestamps: false
    }
  });
}
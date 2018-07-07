export default function loadTables(orm) {
  orm.defineTable({
    name: 'albums',

    props: {
      key: 'id',
      autoId: false,
      timestamps: true
    },

    relations: {
      posts() {
        return this.hasMany('posts', 'album_id');
      },
      subscribers() {
        return this.manyToMany('users', 'subscriptions_albums', 'album_id', 'user_id');
      }
    }
  });
}

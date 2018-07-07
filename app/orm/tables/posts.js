export default function loadTables(orm) {
  orm.defineTable({
    name: 'posts',

    props: {
      key: 'id',
      autoId: false,
      timestamps: true
    },

    relations: {
      tags() {
        return this.manyToMany('tags', 'posts_tags', 'post_id', 'tag_id');
      }
    }
  });
}

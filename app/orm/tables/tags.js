module.exports = function loadTables(orm) {
  orm.defineTable({
    name: 'tags',

    props: {
      key: 'id',
      autoId: false,
      timestamps: false
    },

    relations: {
      posts() {
        return this.manyToMany('posts', 'posts_tags', 'tag_id', 'post_id');
      }
    }
  });
}

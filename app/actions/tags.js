const {table} = require('./../orm');

module.exports = {
  findByName,
  findOrCreate,
  findAll,
  findAllByPostId,
  deleteByName,
  searchByName,
  posts
};

const defaultLimit = 10;

function findByName(name) {
  return table('tags').first('name', name);
}

function findAll(limit = defaultLimit) {
  return table('tags').limit(limit).all();
}

function findAllByPostId(postId, limit = defaultLimit) {
  return table('tags').limit(limit).posts().join().where('posts.id', postId).all();
}

function findOrCreate(name) {
  return findByName(name).then(id => id || table('tags').insert({name}));
}

function deleteByName(name, softDelete = true) {
  return (softDelete
    ? table('posts').where('name', name).update({deleted_at: new Date()})
    : table('posts').where('name', name).delete()
  ).then(rowsAffected => !!rowsAffected);
}

function searchByName(name, page = 1, limit = defaultLimit) {
  return table('tags').whereRaw('name like ?', [`%${name}%`]).forPage(page, limit).all();
}

function posts(id) {
  return table('posts_tags').select('post_id').all('tag_id', id).map(item => item.post_id).then(ids =>
    table('posts').whereIn('id', ids).all()
  );
}

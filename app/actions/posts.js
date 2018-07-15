const {table} = require('./../orm');

module.exports = {
  findById,
  findByAlbumId,
  findByUserId,
  findByFileId,
  findAll,
  findAllByUserId,
  findAllByAlbumId,
  findAllByUserIdAndAlbumId,
  findAllByVisibility,
  create,
  updateById,
  updateByIdAndUserId,
  deleteById,
  deleteByIdAndUserId,
  like,
  tags,
  addTag,
  removeTags,
  likes,
  feed
};

const defaultLimit = 10;

function findById(id, withTrashed = false) {
  return withTrashed
    ? table('posts').first('id', id)
    : table('posts').whereNull('deleted_at').first('id', id);
}

function findByAlbumId(albumId, withTrashed = false) {
  return withTrashed
    ? table('posts').all('album_id', albumId)
    : table('posts').whereNull('deleted_at').first('album_id', albumId);
}

function findByUserId(userId, withTrashed = false) {
  return withTrashed
    ? table('posts').all('user_id', userId)
    : table('posts').whereNull('deleted_at').first('user_id', userId);
}

function findByFileId(fileId, withTrashed = false) {
  return withTrashed
    ? table('posts').first('file_id', fileId)
    : table('posts').whereNull('deleted_at').first('file_id', fileId);
}

function findAll(limit = defaultLimit, withTrashed = false) {
  return withTrashed
    ? table('posts').limit(limit).all()
    : table('posts').whereNull('deleted_at').limit(limit).all();
}

function findAllByUserId(userId, limit = defaultLimit, withTrashed = false) {
  return withTrashed
    ? table('posts').limit(limit).all('user_id', userId)
    : table('posts').whereNull('deleted_at').limit(limit).all('user_id', userId);
}

function findAllByAlbumId(albumId, limit = defaultLimit, withTrashed = false) {
  return withTrashed
    ? table('posts').limit(limit).all('album_id', albumId)
    : table('posts').whereNull('deleted_at').limit(limit).all('album_id', albumId);
}

function findAllByUserIdAndAlbumId(userId, albumId, limit = defaultLimit, withTrashed = false) {
  return withTrashed
    ? table('posts').where('user_id', userId).where('album_id', albumId).limit(limit).all()
    : table('posts').whereNull('deleted_at').where('user_id', userId).where('album_id', albumId).limit(limit).all();
}

function findAllByVisibility(visibility, limit = defaultLimit, withTrashed = false) {
  return withTrashed
    ? table('posts').limit(limit).all('visibility', visibility)
    : table('posts').whereNull('deleted_at').limit(limit).all('visibility', visibility);
}

function create(input) {
  return table('posts').insert(input);
}

function updateById(id, input, withTrashed = true) {
  return (withTrashed
    ? table('posts').where('id', id).update(input)
    : table('posts').where('id', id).whereNull('deleted_at').update(input)
  ).then(rowsAffected => !!rowsAffected);
}

function updateByIdAndUserId(id, userId, input, withTrashed = true) {
  return (withTrashed
    ? table('posts').where('id', id).where('user_id', userId).update(input)
    : table('posts').where('id', id).where('user_id', userId).whereNull('deleted_at').update(input)
  ).then(rowsAffected => !!rowsAffected);
}

function deleteById(id, softDelete = true) {
  return (softDelete
    ? table('posts').where('id', id).update({deleted_at: new Date()})
    : table('posts').where('id', id).delete()
  ).then(rowsAffected => !!rowsAffected);
}

function deleteByIdAndUserId(id, userId, softDelete = true) {
  return (softDelete
    ? table('posts').where('id', id).where('user_id', userId).update({deleted_at: new Date()})
    : table('posts').where('id', id).where('user_id', userId).delete()
  ).then(rowsAffected => rowsAffected > 0 ? removeTags(id) : false);
}

function like(id, userId) {
  return table('likes_posts').where('user_id', userId).first('post_id', id).then(record => !record
    ? table('likes_posts').insert({post_id: id, user_id: userId})
    : table('likes_posts').delete('id', record.id)
  ).then(rowsAffected => !!rowsAffected);
}

function tags(id) {
  return table('posts_tags').select('tag_id').all('post_id', id).map(item => item.tag_id).then(ids =>
    table('tags').whereIn('id', ids).all()
  );
}

function addTag(postId, tagId) {
  return table('posts_tags').insert({post_id: postId, tag_id: tagId});
}

function removeTags(postId) {
  return table('posts_tags').delete('post_id', postId).then(rowsAffected => !!rowsAffected);
}

function likes(id) {
  return table('likes_posts').select('id').all('post_id', id).then(count => count.length).catch(() => 0);
}

// eslint-disable-next-line
function feed(page = 1, limit = defaultLimit) {
  return null;
}

const {table} = require('app/orm');

module.exports = {
  findById,
  findByPostId,
  findByUserId,
  findAll,
  findAllByUserId,
  findAllByPostId,
  findAllByUserIdAndPostId,
  create,
  updateById,
  updateByIdAndUserId,
  deleteById,
  deleteByIdAndUserId,
  deleteByIdAndPostId,
  deleteByUserIdAndPostId,
  like,
  likes
};

const defaultLimit = 10;

function findById(id, withTrashed = false) {
  return withTrashed
    ? table('comments').first('id', id)
    : table('comments').whereNull('deleted_at').first('id', id);
}

function findByPostId(postId, withTrashed = false) {
  return withTrashed
    ? table('comments').all('post_id', postId)
    : table('comments').whereNull('deleted_at').first('post_id', postId);
}

function findByUserId(userId, withTrashed = false) {
  return withTrashed
    ? table('comments').all('user_id', userId)
    : table('comments').whereNull('deleted_at').first('user_id', userId);
}

function findAll(limit = defaultLimit, withTrashed = false) {
  return withTrashed
    ? table('comments').limit(limit).all()
    : table('comments').whereNull('deleted_at').limit(limit).all();
}

function findAllByUserId(userId, limit = defaultLimit, withTrashed = false) {
  return withTrashed
    ? table('comments').limit(limit).all('user_id', userId)
    : table('comments').whereNull('deleted_at').limit(limit).all('user_id', userId);
}

function findAllByPostId(postId, limit = defaultLimit, withTrashed = false) {
  return withTrashed
    ? table('comments').limit(limit).all('post_id', postId)
    : table('comments').whereNull('deleted_at').limit(limit).all('post_id', postId);
}

function findAllByUserIdAndPostId(userId, postId, limit = defaultLimit, withTrashed = false) {
  return withTrashed
    ? table('comments').where('user_id', userId).where('post_id', postId).limit(limit).all()
    : table('comments').whereNull('deleted_at').where('user_id', userId).where('post_id', postId).limit(limit).all();
}

function create(input) {
  return table('comments').insert(input);
}

function updateById(id, input, withTrashed = true) {
  return (withTrashed
    ? table('comments').where('id', id).update(input)
    : table('comments').where('id', id).whereNull('deleted_at').update(input)
  ).then(rowsAffected => !!rowsAffected);
}

function updateByIdAndUserId(id, userId, input, withTrashed = true) {
  return (withTrashed
    ? table('comments').where('id', id).where('user_id', userId).update(input)
    : table('comments').where('id', id).where('user_id', userId).whereNull('deleted_at').update(input)
  ).then(rowsAffected => !!rowsAffected);
}

function deleteById(id, softDelete = true) {
  return (softDelete
    ? table('comments').where('id', id).update({deleted_at: new Date()})
    : table('comments').where('id', id).delete()
  ).then(rowsAffected => !!rowsAffected);
}

function deleteByIdAndUserId(id, userId, softDelete = true) {
  return (softDelete
    ? table('comments').where('id', id).where('user_id', userId).update({deleted_at: new Date()})
    : table('comments').where('id', id).where('user_id', userId).delete()
  ).then(rowsAffected => !!rowsAffected);
}

function deleteByIdAndPostId(id, postId, softDelete = true) {
  return (softDelete
    ? table('comments').where('id', id).where('post_id', postId).update({deleted_at: new Date()})
    : table('comments').where('id', id).where('post_id', postId).delete()
  ).then(rowsAffected => !!rowsAffected);
}

function deleteByUserIdAndPostId(userId, postId, softDelete = true) {
  return (softDelete
    ? table('comments').where('user_id', userId).where('post_id', postId).update({deleted_at: new Date()})
    : table('comments').where('user_id', userId).where('post_id', postId).delete()
  ).then(rowsAffected => !!rowsAffected);
}

function like(id, userId) {
  return table('likes_comments').where('user_id', userId).first('comment_id', id).then(record => !record
    ? table('likes_comments').insert({comment_id: id, user_id: userId})
    : table('likes_comments').delete('id', record.id)
  ).then(rowsAffected => !!rowsAffected);
}

function likes(id) {
  return table('likes_comments').select('id').all('comment_id', id).then(count => count.length).catch(() => 0);
}

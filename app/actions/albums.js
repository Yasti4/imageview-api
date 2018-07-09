const {table} = require('./../orm');

module.exports = {
  findById,
  findAll,
  findAllByUserId,
  findAllByVisibility,
  create,
  updateById,
  updateByIdAndUserId,
  deleteById,
  deleteByIdAndUserId,
  like,
  follow,
  likes,
  subscribers
};

const defaultLimit = 10;

function findById(id, withTrashed = false) {
  return withTrashed
    ? table('albums').first('id', id)
    : table('albums').whereNull('deleted_at').first('id', id);
}

function findAll(limit = defaultLimit, withTrashed = false) {
  return withTrashed
    ? table('albums').limit(limit).all()
    : table('albums').whereNull('deleted_at').limit(limit).all();
}

function findAllByUserId(userId, limit = defaultLimit, withTrashed = false) {
  return withTrashed
    ? table('albums').limit(limit).all('user_id', userId)
    : table('albums').whereNull('deleted_at').limit(limit).all('user_id', userId);
}

function findAllByVisibility(visibility, limit = defaultLimit, withTrashed = false) {
  return withTrashed
    ? table('albums').limit(limit).all('visibility', visibility)
    : table('albums').whereNull('deleted_at').limit(limit).all('visibility', visibility);
}

function create(input) {
  return table('albums').insert(input);
}

function updateById(id, input, withTrashed = true) {
  return (withTrashed
    ? table('albums').where('id', id).update(input)
    : table('albums').where('id', id).whereNull('deleted_at').update(input)
  ).then(rowsAffected => !!rowsAffected);
}

function updateByIdAndUserId(id, userId, input, withTrashed = true) {
  return (withTrashed
    ? table('albums').where('id', id).where('user_id', userId).update(input)
    : table('albums').where('id', id).where('user_id', userId).whereNull('deleted_at').update(input)
  ).then(rowsAffected => !!rowsAffected);
}

function deleteById(id, softDelete = true) {
  return (softDelete
    ? table('albums').where('id', id).update({deleted_at: new Date()})
    : table('albums').where('id', id).delete()
  ).then(rowsAffected => !!rowsAffected);
}

function deleteByIdAndUserId(id, userId, softDelete = true) {
  return (softDelete
    ? table('albums').where('id', id).where('user_id', userId).update({deleted_at: new Date()})
    : table('albums').where('id', id).where('user_id', userId).delete()
  ).then(rowsAffected => !!rowsAffected);
}

function like(id, userId) {
  return table('likes_albums').where('user_id', userId).first('album_id', id).then(record => !record
    ? table('likes_albums').insert({album_id: id, user_id: userId})
    : table('likes_albums').delete('id', record.id)
  ).then(rowsAffected => !!rowsAffected);
}

function follow(id, userId) {
  return table('subscriptions_albums').where('user_id', userId).first('album_id', id).then(record => !record
    ? table('subscriptions_albums').insert({album_id: id, user_id: userId})
    : table('subscriptions_albums').delete('id', record.id)
  ).then(rowsAffected => !!rowsAffected);
}

function likes(id) {
  return table('likes_albums').select('id').all('album_id', id).then(count => count.length).catch(() => 0);
}

function subscribers(id) {
  return table('subscriptions_albums').select('user_id').all('id', id).map(item => item.user_id).then(ids =>
    table('users').whereIn('id', ids).all()
  );
}

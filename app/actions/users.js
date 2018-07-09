const {table} = require('./../orm');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const {unixTimestamp, atob} = require('./../helpers');

module.exports = {
  me,
  token,
  findById,
  findByUsername,
  findByEmail,
  findByFileId,
  findAll,
  findAllByRole,
  create,
  updateByUsername,
  updateByIdAndUsername,
  changePassword,
  privacity,
  updatePrivacity,
  follow,
  searchByUsername,
  likesComments,
  likesPosts,
  likesAlbums,
  subscriptionsAlbums,
  image,
  following,
  followers
};

const defaultLimit = 10;

function me(token) {
  const payload = jwt.decode(token, process.env.APP_KEY);
  return payload ? payload.sub : null;
}

async function token(email, password) {
  const user = await table('users').first('email', email);
  if (!user || !await bcrypt.compare(atob(password), user.password)) {
    return null;
  }
  const now = new Date();
  now.setDate(now.getDate() + 14);
  return {
    tokenType: 'Bearer',
    expiresIn: unixTimestamp(now),
    accessToken: jwt.encode({
      sub: user,
      iat: unixTimestamp(),
      exp: unixTimestamp(now)
    }, process.env.APP_KEY)
  };
}

function findById(id, withTrashed = false) {
  return withTrashed
    ? table('users').first('id', id)
    : table('users').whereNull('deleted_at').first('id', id);
}

function findByUsername(username, withTrashed = false) {
  return withTrashed
    ? table('users').first('username', username)
    : table('users').whereNull('deleted_at').first('username', username);
}

function findByEmail(email, withTrashed = false) {
  return withTrashed
    ? table('users').first('email', email)
    : table('users').whereNull('deleted_at').first('email', email);
}

function findByFileId(fileId, withTrashed = false) {
  return withTrashed
    ? table('users').first('file_id', fileId)
    : table('users').whereNull('deleted_at').first('file_id', fileId);
}

function findAll(limit = defaultLimit, withTrashed = false) {
  return withTrashed
    ? table('users').limit(limit).all()
    : table('users').whereNull('deleted_at').limit(limit).all();
}

function findAllByRole(role, limit = defaultLimit, withTrashed = false) {
  return withTrashed
    ? table('users').limit(limit).all('role', role)
    : table('users').whereNull('deleted_at').limit(limit).all('role', role);
}

function hashPassword(password) {
  return bcrypt.hash(password, +process.env.APP_SALT);
}

function create(input) {
  return hashPassword(atob(input.password)).then(password => table('users').insert({...input, password}));
}

async function updateByUsername(username, input, withTrashed = false) {
  if (input.password) {
    input.password = await hashPassword(atob(input.password));
  } else {
    delete input.password;
  }
  return (withTrashed
    ? table('users').where('username', username).update(input)
    : table('users').where('username', username).whereNull('deleted_at').update(input))
    .then(rowsAffected => !!rowsAffected);
}

async function updateByIdAndUsername(id, username, input, withTrashed = false) {
  if (input.password) {
    input.password = await hashPassword(atob(input.password));
  } else {
    delete input.password;
  }
  return (withTrashed
    ? table('users').where('id', id).where('username', username).update(input)
    : table('users').where('id', id).where('username', username).whereNull('deleted_at').update(input))
    .then(rowsAffected => !!rowsAffected);
}

function updatePrivacity(id, input, withTrashed = false) {
  return (withTrashed
    ? table('privacities').where('user_id', id).update(input)
    : table('privacities').where('user_id', id).whereNull('deleted_at').update(input))
    .then(rowsAffected => !!rowsAffected);
}

function privacity(userId) {
  return table('privacities').first('user_id', userId);
}

async function changePassword(id, oldPassword, newPassword) {
  const user = await findById(id);
  if (!user || !await bcrypt.compare(atob(oldPassword), user.password)) {
    return false;
  }
  const password = await await hashPassword(atob(newPassword));
  return table('users').where('id', id).update({password}).then(rowsAffected => !!rowsAffected);
}

function follow(userFollower, userFollowed) {
  return table('subscriptions_users')
    .where('user_follower', userFollower).where('user_followed', userFollowed).first().then(record => !record
      ? table('subscriptions_users').insert({user_follower: userFollower, user_followed: userFollowed})
      : table('subscriptions_users').delete('id', record.id)
    ).then(rowsAffected => !!rowsAffected);
}

function searchByUsername(username, page = 1, limit = defaultLimit) {
  return table('users').whereRaw('username like ?', [`%${username}%`]).forPage(page, limit).all();
}

function likesComments(id) {
  return table('likes_comments').select('id').all('user_id', id).then(count => count.length).catch(() => 0);
}

function likesPosts(id) {
  return table('likes_posts').select('id').all('user_id', id).then(count => count.length).catch(() => 0);
}

function likesAlbums(id) {
  return table('likes_albums').select('id').all('user_id', id).then(count => count.length).catch(() => 0);
}

function subscriptionsAlbums(id) {
  return table('subscriptions_albums').select('id').all('user_id', id).then(count => count.length).catch(() => 0);
}

function image(fileId) {
  return table('images').first('file_id', fileId);
}

function following(id) {
  return table('subscriptions_users').select('user_followed').all('user_follower', id)
    .map(item => item.user_followed).then(ids => table('users').whereIn('id', ids).all());
}

function followers(id) {
  return table('subscriptions_users').select('user_follower').all('user_followed', id)
    .map(item => item.user_follower).then(ids => table('users').whereIn('id', ids).all());
}

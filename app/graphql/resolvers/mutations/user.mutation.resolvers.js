'use strict';

const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const {unixTimestamp, sendMail, atob} = require('app/helpers');

module.exports = {
  signIn: async (parent, args, context) => {
    const user = await context.db('users').first('email', args.email);
    if (!user || !await bcrypt.compare(atob(args.password), user.password)) {
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
  },
  createUser: async (parent, args, context) => {
    args.input.password = await bcrypt.hash(atob(args.input.password), +process.env.APP_SALT);
    const user = await context.db('users').insert(args.input);
    if (!user) {
      return null;
    }
    await sendMail({
      to: user.email,
      subject: 'Welcome to ImageView!',
      text: 'Hello world como text',
      html: '<b>Hello world como html</b>'
    });
    return user;
  },
  updateUser: async (parent, args, context) => {
    if (args.input.password) {
      args.input.password = await bcrypt.hash(atob(args.input.password), +process.env.APP_SALT);
    }
    let mutate = context.db('users').where('username', args.input.username);
    if (!context.isAdmin) {
      mutate = mutate.where('id', context.userAuth.id);
    }
    return mutate.update({
      email: args.input.email,
      name: args.input.name,
      lastname: args.input.lastname,
      role: args.input.role,
      ...args.input.password ? {password: args.input.password} : {}
    });
  },
  changePassword: async (parent, args, context) => {
    const user = await context.db('users').first(context.userAuth.id);
    if (!user || !await bcrypt.compare(atob(args.old), user.password)) {
      return false;
    }
    const password = await bcrypt.hash(atob(args.new), +process.env.APP_SALT);
    return context.db('users').update(context.userAuth.id, {password});
  },
  updateUserPrivacity: (parent, args, context) => {
    return context.db('privacities').where('user_id', context.userAuth.id).update(args.input);
  },
  follow: async (parent, args, context) => {
    const findDestroyOrCreate = async (table, instance = {id: 0}, obj = {}) => {
      if (instance) {
        return await context.db(table).delete(instance.id);
      } else {
        return !!(await context.db(table).insert(obj));
      }
    };

    if (args.input.user_follower && args.input.user_followed) {
      const instance = await context.db('subscriptions_users')
        .where('user_follower', args.input.user_follower).where('user_followed', args.input.user_followed)
        .first();
      return findDestroyOrCreate('subscriptions_users', instance, {
        user_follower: args.input.user_follower, user_followed: args.input.user_followed
      });
    } else if (args.input.album_id) {
      const instance = await context.db('subscriptions_albums')
        .where('user_id', context.userAuth.id).where('album_id', args.input.album_id)
        .first();
      return findDestroyOrCreate('subscriptions_albums', instance, {album_id: args.input.album_id});
    } else {
      return false;
    }
  }
};

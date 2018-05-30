'use strict';

const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const { unixTimestamp, sendMail, atob } = require('./../../../helpers');

module.exports = {
  signIn: async (parent, args, context, info) => {
    const user = await context.db.User.find({ where: { email: args.email } });
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
  createUser: async (parent, args, context, info) => {
    args.input.password = await bcrypt.hash(atob(args.input.password), +process.env.APP_SALT);
    const user = await context.db.User.create(args.input);
    await sendMail({
      to: user.email,
      subject: 'Welcome to ImageView!',
      text: 'Hello world como text',
      html: '<b>Hello world como html</b>'
    });
    return user;
  },
  updateUser: async (parent, args, context, info) => {
    if (args.input.password) {
      args.input.password = await bcrypt.hash(atob(args.input.password), +process.env.APP_SALT);
    }
    const canUpdate = context.isAdmin ? {} : { id: context.userAuth.id };
    const affectedRows = await context.db.User.update({
      email: args.input.email,
      name: args.input.name,
      lastname: args.input.lastname,
      role: args.input.role,
      ...args.input.password ? { password: args.input.password } : {}
    }, { where: { username: args.input.username, ...canUpdate } });
    return !!affectedRows[0];
  },
  changePassword: async (parent, args, context, info) => {
    const user = await context.db.User.find({ where: { id: context.userAuth.id } });
    if (!user || !await bcrypt.compare(atob(args.old), user.password)) {
      return false;
    }
    const password = await bcrypt.hash(atob(args.new), +process.env.APP_SALT);
    const affectedRows = await context.db.User.update({ password }, {
      where: { id: context.userAuth.id }
    });
    return !!affectedRows[0];
  },
  updateUserPrivacity: async (parent, args, context, info) => {
    const affectedRows = await context.db.Privacity.update(args.input, {
      where: { user_id: context.userAuth.id }
    });
    return !!affectedRows[0];
  },
  follow: async (parent, args, context, info) => {
    const follower = await context.db.User.find({
      where: { id: args.input.user_follower },
      include: [{
        model: context.db.User,
        as: 'following'
        // where: { id: args.input.user_follower }
      }]
    });
    const followedId = 13; // args.input.user_followed;
    const unfollow = !!follower.following.find(user => user.id === followedId);
    if (unfollow) {
      context.db.User.removeFollowing(unfollow);
      // follower.destroy({ force: softDelete() });
    } else {
      // follower.create({ force: softDelete() });
    }
    console.log('encontrado: ' + unfollow);
    // console.log(follower.following);
    return true;
  }
};

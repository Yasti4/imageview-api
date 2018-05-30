'use strict';

const jwt = require('jwt-simple');
const { unixTimestamp } = require('./../../../helpers');

module.exports = {
  signIn: (parent, args, context, info) => {
    return context.db.User.find({
      where: { email: args.email, password: args.password }
    }).then(user => {
      const now = new Date();
      now.setDate(now.getDate() + 14);
      return user ? {
        tokenType: 'Bearer',
        expiresIn: unixTimestamp(now),
        accessToken: jwt.encode({
          sub: user,
          iat: unixTimestamp(),
          exp: unixTimestamp(now)
        }, process.env.APP_KEY)
      } : null;
    });
  },
  createUser: (parent, args, context, info) => {
    args.input.image_id = 1;
    return context.db.User.create(args.input);
  },
  updateUser: (parent, args, context, info) => {
    return context.db.User.update(
      args.input, {
        where: {
          username: args.username
        }
      }
    );
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

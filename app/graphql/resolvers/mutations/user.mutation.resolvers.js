'use strict';

const {sendMail} = require('./../../../helpers/mail');

module.exports = {
  signIn: async (parent, args, context) => {
    return context.actions.users.token(args.email, args.password);
  },
  createUser: async (parent, args, context) => {
    const id = await context.actions.users.create(args.input);
    if (!id) {
      return null;
    }
    const user = await context.actions.users.findById(id);
    await sendMail({
      to: user.email,
      subject: 'Welcome to ImageView!',
      text: 'Hello world como text',
      html: '<b>Hello world como html</b>'
    });
    return user;
  },
  updateUser: async (parent, args, context) => {
    return context.isAdmin
      ? context.actions.users.updateByUsername(args.input.username, args.input)
      : context.actions.users.updateByIdAndUsername(context.userAuth.id, args.input.username, args.input);
  },
  changePassword: async (parent, args, context) => {
    return context.actions.users.changePassword(context.userAuth.id, args.old, args.new);
  },
  updateUserPrivacity: (parent, args, context) => {
    return context.actions.users.updatePrivacity(context.userAuth.id, args.input);
  }
};

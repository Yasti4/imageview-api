'use strict';

const {sendMail} = require('./../../../helpers');

module.exports = {
  forgottenPassword: async (parent, args, context) => {
    const user = await context.actions.users.findByEmail(args.email);
    return user ? sendMail({
      to: user.email,
      subject: 'Forgotten password!',
      text: 'confirm???',
      html: '<b>confirm???</b>'
    }).then(() => true).catch(() => false) : false;
  }
};

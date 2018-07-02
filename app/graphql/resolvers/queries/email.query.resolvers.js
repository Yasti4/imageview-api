'use strict';

const {sendMail} = require('app/helpers');

module.exports = {
  forgottenPassword: async (parent, args, context) => {
    const user = await context.db('users').first('email', args.email);
    return user ? sendMail({
      to: user.email,
      subject: 'Forgotten password!',
      text: 'confirm???',
      html: '<b>confirm???</b>'
    }).then(() => true).catch(() => false) : false;
  }
};

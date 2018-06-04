'use strict';

const { sendMail } = require('./../../../helpers');

module.exports = {
  forgottenPassword: async (parent, args, context, info) => {
    const user = await context.db.User.find({
      where: { email: args.email }
    });
    if (user) {
      await sendMail({
        to: user.email,
        subject: 'Forgotten password!',
        text: 'confirm???',
        html: '<b>confirm???</b>'
      });
      return true;
    }
    return false;
  }
};

'use strict';

const nodemailer = require('nodemailer');

module.exports = {
  sendMail
};

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: +process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});

function sendMail(options = {}) {
  return new Promise((resolve, reject) =>
    transporter.sendMail(Object.assign({}, {
      from: process.env.MAIL_SENDER,
      to: null,
      subject: '',
      text: '',
      html: ''
    }, options), (err, info) => err ? reject(err) : resolve(info))
  );
}

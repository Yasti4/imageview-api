'use strict';

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: +process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});

exports.sendMail = (options = {}) => new Promise((resolve, reject) =>
  transporter.sendMail({
    from: process.env.MAIL_SENDER,
    to: null,
    subject: '',
    text: '',
    html: '',
    ...options
  }, (err, info) => err ? reject(err) : resolve(info))
);

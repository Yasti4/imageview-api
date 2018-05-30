'use strict';

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(require('./../config/nodemailer'));

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

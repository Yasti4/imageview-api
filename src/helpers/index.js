'use strict';

exports.randomItem = (array = []) => array[Math.floor(Math.random() * array.length)];

exports.unixTimestamp = (date = new Date()) => Math.floor(date.getTime() / 1000);

const { atob, btoa } = require('./base64');
exports.atob = atob;
exports.btoa = btoa;

const { sendMail } = require('./mail');
exports.sendMail = sendMail;

const { saveImage, savePDF } = require('./file');
exports.saveImage = saveImage;
exports.savePDF = savePDF;

const { createDatabase, softDelete, pagination, orderBy } = require('./sequelize');
exports.createDatabase = createDatabase;
exports.softDelete = softDelete;
exports.pagination = pagination;
exports.orderBy = orderBy;

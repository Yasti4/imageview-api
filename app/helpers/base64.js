'use strict';

exports.atob = (str) => Buffer.from(str, 'base64').toString('binary');

exports.btoa = (str) => Buffer.from(str).toString('base64');

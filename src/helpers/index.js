'use strict';

exports.randomItem = (array = []) => array[Math.floor(Math.random() * array.length)];

exports.unixTimestamp = (date = new Date()) => Math.floor(date.getTime() / 1000);

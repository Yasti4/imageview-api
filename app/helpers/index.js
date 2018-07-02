'use strict';

const exportAll = (arr = []) => {
  arr.forEach(obj => {
    Object.keys(obj).forEach(key => {
      Object.defineProperty(exports, key, {
        enumerable: true,
        get () {
          return obj[key];
        }
      });
    });
  });
};

exports.exportAll = exportAll;
exports.randomItem = (array = []) => array[Math.floor(Math.random() * array.length)];
exports.unixTimestamp = (date = new Date()) => Math.floor(date.getTime() / 1000);

exportAll([
  require('./base64'), require('./db'), require('./common'), require('./mail'), require('./file')
]);

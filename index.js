/*!
 * find-pkg <https://github.com/jonschlinkert/find-pkg>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/**
 * Module dependencies
 */

var findFile = require('find-file-up');

/**
 * Find package.json, starting with the given directory.
 * Based on https://github.com/jonschlinkert/look-up
 */

module.exports = function(dir, cb) {
  return findFile('package.json', dir, cb);
};

/**
 * Sync
 */

module.exports.sync = function(dir) {
  return findFile.sync('package.json', dir);
};

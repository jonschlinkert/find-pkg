/*!
 * find-pkg <https://github.com/jonschlinkert/find-pkg>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

/**
 * Module dependencies
 */

var findFile = require('find-file-up');

/**
 * Find package.json, starting with the given directory
 */

module.exports = function(dir, limit, cb) {
  return findFile('package.json', dir, limit, cb);
};

/**
 * Sync
 */

module.exports.sync = function(dir, limit) {
  return findFile.sync('package.json', dir, limit);
};

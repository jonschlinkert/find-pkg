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

var fs = require('fs');
var path = require('path');
var resolve = require('resolve-dir');
var cwd = process.cwd();

/**
 * Find package.json, starting with the given directory
 */

module.exports = function findPkg(dir, cb) {
  dir = resolve(dir);

  function find(dir, next) {
    var fp = path.resolve(dir, 'package.json');
    fs.exists(fp, function(exists) {
      if (exists) {
        cb(null, fp);
        return;
      }
      if (dir === cwd || dir === '.') {
        next(null, null);
      } else {
        find(path.dirname(dir), next);
      }
    });
  }
  find(resolve(dir), cb);
};

module.exports.sync = function findPkgSync(dir) {
  dir = resolve(dir);

  function find(dir) {
    var fp = path.resolve(dir, 'package.json');
    if (fs.existsSync(fp)) {
      return fp;
    }
    if (dir === cwd || dir === '.') {
      return null;
    }
    return find(path.dirname(dir));
  }
  return find(resolve(dir));
};

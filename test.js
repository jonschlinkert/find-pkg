/*!
 * find-pkg <https://github.com/jonschlinkert/find-pkg>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var findPkg = require('./');

describe('findPkg', function () {
  it('should resolve package.json in the cwd:', function (cb) {
    findPkg('.', function(err, fp) {
      assert.equal(fp, path.resolve('package.json'));
      cb();
    });
  });

  it('should resolve package.json from one directory up:', function (cb) {
    findPkg('test', function(err, fp) {
      assert.equal(fp, path.resolve('package.json'));
      cb();
    });
  });

  it('should resolve package.json from multiple directories up:', function (cb) {
    findPkg('test/a/b/c/c/', function(err, fp) {
      assert.equal(fp, path.resolve('package.json'));
      cb();
    });
  });
});

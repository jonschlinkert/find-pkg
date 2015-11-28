/*!
 * find-pkg <https://github.com/jonschlinkert/find-pkg>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var resolve = require('resolve-dir');
var assert = require('assert');
var findPkg = require('./');
var del = require('delete');

describe('find-file', function() {
  it('should resolve a file in the cwd:', function(cb) {
    findPkg('.', function(err, fp) {
      assert.equal(fp, path.resolve('package.json'));
      cb();
    });
  });

  it('should resolve a file from user home:', function(cb) {
    fs.writeFile(resolve('~/package.json'), 'tmp', function(err) {
      if (err) return cb(err);

      findPkg('~/_a/b/c', function(err, fp) {
        assert(fp === resolve('~/package.json'));
        del(fp, {force: true}, cb);
      });
    });
  });

  it('should return undefined when the file does not exist:', function(cb) {
    findPkg(resolve('~/a/b/c'), function(err, fp) {
      assert(fp === undefined);
      cb();
    });
  });

  it('should resolve a file from one directory up:', function(cb) {
    findPkg('test', function(err, fp) {
      assert.equal(fp, path.resolve('package.json'));
      cb();
    });
  });

  it('should resolve package.json from multiple directories up:', function(cb) {
    findPkg('test/a/b/c/c/', function(err, fp) {
      assert.equal(fp, path.resolve('package.json'));
      cb();
    });
  });
});

describe('find-file-sync', function() {
  it('should resolve a file in the cwd:', function() {
    var fp = findPkg.sync('.');
    assert.equal(fp, path.resolve('package.json'));
  });

  it('should resolve a file from user home:', function() {
    fs.writeFileSync(resolve('~/package.json'), 'tmp');

    var fp = findPkg.sync('~/_a/b/c');
    assert(fp === resolve('~/package.json'));
    del.sync(fp, {force: true});
  });

  it('should return undefined when the file does not exist:', function() {
    var fp = findPkg.sync(resolve('~/a/b/c'));
    assert(fp === undefined);
  });

  it('should resolve a file from one directory up:', function() {
    var fp = findPkg.sync('test');
    assert.equal(fp, path.resolve('package.json'));
  });

  it('should resolve package.json from multiple directories up:', function() {
    var fp = findPkg.sync('test/a/b/c/c/');
    assert.equal(fp, path.resolve('package.json'));
  });
});

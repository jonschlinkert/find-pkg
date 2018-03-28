'use strict';

require('mocha');
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const del = require('delete');
const resolve = require('resolve-dir');
const find = require('./');

describe('find-pkg', function() {
  describe('async', function() {
    it('should work with promises', async() => {
      const file = await find('.');
      assert.equal(file, path.resolve('package.json'));
    });

    it('should work with promises and default cwd', async() => {
      const file = await find();
      assert.equal(file, path.resolve('package.json'));
    });

    it('should resolve a file in the cwd:', function(cb) {
      find('.', function(err, fp) {
        if (err) return cb(err);
        assert.equal(fp, path.resolve('package.json'));
        cb();
      });
    });

    it('should resolve a file from user home:', function(cb) {
      fs.writeFile(resolve('~/package.json'), 'tmp', function(err) {
        if (err) return cb(err);

        find('~/_a/b/c', function(err, fp) {
          if (err) return cb(err);
          assert.equal(fp, resolve('~/package.json'));
          del(fp, {force: true}, cb);
        });
      });
    });

    it('should return undefined when the file does not exist:', function(cb) {
      find(resolve('~/a/b/c'), function(err, fp) {
        if (err) return cb(err);
        assert(!fp);
        cb();
      });
    });

    it('should resolve a file from one directory up:', function(cb) {
      find('test', function(err, fp) {
        if (err) return cb(err);
        assert.equal(fp, path.resolve('package.json'));
        cb();
      });
    });

    it('should resolve package.json from multiple directories up:', function(cb) {
      find('test/a/b/c/c/', function(err, fp) {
        if (err) return cb(err);
        assert.equal(fp, path.resolve('package.json'));
        cb();
      });
    });

    it('should stop at the given limit', function(cb) {
      find('fixtures/a/b/c/d/e', function(err, fp) {
        if (err) return cb(err);
        assert.equal(fp, path.resolve('fixtures/a/b/package.json'));

        find('fixtures/a/b/c/d/e', 2, function(err, fp) {
          if (err) return cb(err);
          assert(!fp);
          cb();
        });
      });
    });
  });

  describe('sync', function() {
    it('should resolve a file in the cwd:', function() {
      const fp = find.sync('.');
      assert.equal(fp, path.resolve('package.json'));
    });

    it('should resolve a file from user home:', function() {
      fs.writeFileSync(resolve('~/package.json'), 'tmp');

      const fp = find.sync('~/_a/b/c');
      assert.equal(fp, resolve('~/package.json'));
      del.sync(fp, {force: true});
    });

    it('should return undefined when the file does not exist:', function() {
      const fp = find.sync(resolve('~/a/b/c'));
      assert(!fp);
    });

    it('should resolve a file from one directory up:', function() {
      const fp = find.sync('test');
      assert.equal(fp, path.resolve('package.json'));
    });

    it('should stop at the given limit', function() {
      let fp = find.sync('fixtures/a/b/c/d/e');
      assert.equal(fp, path.resolve('fixtures/a/b/package.json'));

      fp = find.sync('fixtures/a/b/c/d/e', 2);
      assert(!fp);
    });

    it('should resolve package.json from multiple directories up:', function() {
      const fp = find.sync('test/a/b/c/c/');
      assert.equal(fp, path.resolve('package.json'));
    });
  });
});

/**
 * author-regex <https://github.com/assemble/author-regex>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

require('mocha');
var assert = require('assert');
var re = require('./');

function parse(str) {
  return re().exec(str);
}

describe('author regex:', function () {
  it('should parse a parsed author object', function () {
    var fixture = 'Jon Schlinkert <jon.schlinkert@sellside.com> (https://github.com/jonschlinkert)';
    var actual = parse(fixture);

    assert.equal(actual[1], 'Jon Schlinkert');
    assert.equal(actual[3], 'jon.schlinkert@sellside.com');
    assert.equal(actual[5], 'https://github.com/jonschlinkert');
  });

  it('should parse name only', function () {
    var fixture = 'Jon Schlinkert';
    var actual = parse(fixture);
    assert.equal(actual[1], 'Jon Schlinkert');
  });

  it('should parse name with trailing whitespace', function () {
    var fixture = 'Jon Schlinkert ';
    var actual = parse(fixture);
    assert.equal(actual[1], 'Jon Schlinkert');
  });

  it('should parse name with leading whitespace', function () {
    var fixture = ' Jon Schlinkert';
    var actual = parse(fixture);
    assert.equal(actual[1], 'Jon Schlinkert');
  });

  it('should parse name and url', function () {
    var fixture = 'Jon Schlinkert (https://github.com/jonschlinkert)';
    var actual = parse(fixture);
    assert.equal(actual[1], 'Jon Schlinkert');
    assert.equal(typeof actual[3], 'string');
    assert.equal(actual[3], 'https://github.com/jonschlinkert');
  });

  it('should parse name and url with no separating space', function () {
    var fixture = 'Jon Schlinkert(https://github.com/jonschlinkert)';
    var actual = parse(fixture);
    assert.equal(actual[1], 'Jon Schlinkert');
    assert.equal(typeof actual[3], 'string');
    assert.equal(actual[3], 'https://github.com/jonschlinkert');
  });

  it('should parse email and url', function () {
    var fixture = '<jon.schlinkert@sellside.com> (https://github.com/jonschlinkert)';
    var actual = parse(fixture);
    assert.equal(typeof actual[1], 'string');
    assert.equal(actual[3], 'jon.schlinkert@sellside.com');
    assert.equal(actual[5], 'https://github.com/jonschlinkert');
  });

  it('should parse name and email', function () {
    var fixture = 'Jon Schlinkert <jon.schlinkert@sellside.com>';
    var actual = parse(fixture);

    assert.equal(actual[1], 'Jon Schlinkert');
    assert.equal(actual[3], 'jon.schlinkert@sellside.com');
  });

  it('should parse email only', function () {
    var fixture = '<jon.schlinkert@sellside.com>';
    var actual = parse(fixture);

    assert.equal(actual[3], 'jon.schlinkert@sellside.com');
  });

  it('should parse url only', function () {
    var fixture = '(https://github.com/jonschlinkert)';
    var actual = parse(fixture);
    assert.equal(actual[3], 'https://github.com/jonschlinkert');
  });
});

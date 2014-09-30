/**
 * author-regex <https://github.com/assemble/author-regex>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';


var assert = require('assert');
var should = require('should');
var re = require('./');

function author(str) {
  return re().exec(str);
}

describe('author regex:', function () {
  it('should return a parsed author object.', function () {
    var fixture = 'Jon Schlinkert <jon.schlinkert@sellside.com> (https://github.com/jonschlinkert)';
    var actual = author(fixture);

    actual[1].should.equal('Jon Schlinkert');
    actual[2].should.equal('jon.schlinkert@sellside.com');
    actual[3].should.equal('https://github.com/jonschlinkert');
  });

  it('should return name and url.', function () {
    var fixture = 'Jon Schlinkert (https://github.com/jonschlinkert)';
    var actual = author(fixture);

    actual[1].should.equal('Jon Schlinkert');
    assert.equal(typeof actual[2], 'undefined');
    actual[3].should.equal('https://github.com/jonschlinkert');
  });

  it('should return name and url.', function () {
    var fixture = 'Jon Schlinkert(https://github.com/jonschlinkert)';
    var actual = author(fixture);

    actual[1].should.equal('Jon Schlinkert');
    assert.equal(typeof actual[2], 'undefined');
    actual[3].should.equal('https://github.com/jonschlinkert');
  });

  it('should email and url.', function () {
    var fixture = '<jon.schlinkert@sellside.com> (https://github.com/jonschlinkert)';
    var actual = author(fixture);

    assert.equal(typeof actual[1], 'undefined');
    actual[2].should.equal('jon.schlinkert@sellside.com');
    actual[3].should.equal('https://github.com/jonschlinkert');
  });

  it('should return name and email.', function () {
    var fixture = 'Jon Schlinkert <jon.schlinkert@sellside.com>';
    var actual = author(fixture);

    actual[1].should.equal('Jon Schlinkert');
    actual[2].should.equal('jon.schlinkert@sellside.com');
  });
});
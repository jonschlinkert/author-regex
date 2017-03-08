
var regex = require('./');
function parse(str) {
  return regex().exec(str);
}

console.log(parse('Jon Schlinkert <jon.schlinkert@sellside.com> (https://github.com/jonschlinkert)'));
console.log(parse('Jon Schlinkert (https://github.com/jonschlinkert)'));
console.log(parse('Jon Schlinkert(https://github.com/jonschlinkert)'));
console.log(parse('<jon.schlinkert@sellside.com> (https://github.com/jonschlinkert)'));
console.log(parse('Jon Schlinkert <jon.schlinkert@sellside.com>'));

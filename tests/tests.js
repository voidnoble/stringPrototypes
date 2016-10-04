var assert = require('assert');
var assertEquals = assert.equal;
var assertThrows = assert['throws'];

require('../stringPrototypes.js');

Object.prototype[1] = 2; // try to break `arguments[1]`

assertEquals(String.prototype.byteCut.length, 1);
assertEquals(String.prototype.propertyIsEnumerable('byteCut'), false);

assertEquals('undefined'.byteCut(null), false);
assertEquals('null'.byteCut(), false);
assertEquals('null'.byteCut(undefined), false);

assertEquals('abc'.byteCut(), false);
assertEquals('abc'.byteCut(''), false);
assertEquals('abc'.byteCut('\0'), false);
assertEquals('abc'.byteCut('a'), false);
assertEquals('abc'.byteCut('b'), false);
assertEquals('abc'.byteCut('ab'), false);
assertEquals('abc'.byteCut('bc'), false);
assertEquals('abc'.byteCut('abc'), false);
assertEquals('abc'.byteCut('bcd'), false);
assertEquals('abc'.byteCut('abcd'), false);
assertEquals('abc'.byteCut('bcde'), false);

var string = "구글 주식회사는 미국의 다국적 기업이다. 1998년에 'BackRub'이라는 이름으로 설립했다. 구글은 미국 전체 인터넷 검색의 2/3, 전 세계의 70%를 장악했다. 2008년에 구글은 자사 웹 페이지 인덱스 크기가 1조 개를 돌파했다고 발표했으며 다른 어떤 검색 엔진보다도 3배 이상 큰 인덱스를 관리한다. 2009년 초 구글에서 매일 수십억 개의 검색 결과 페이지가 방문되고, 수백억 개의 구글 광고가 노출되었다.";
assertEquals(string.byteCut(15), '구글 주식회사는 미국의...');
assertEquals(string.byteCut(17), '구글 주식회사는 미국의 다...');
assertEquals(string.byteCut(20), '구글 주식회사는 미국의 다국적 기...');
assertEquals(string.byteCut(23), '구글 주식회사는 미국의 다국적 기업이다...');
assertEquals(string.byteCut(24), '구글 주식회사는 미국의 다국적 기업이다. ...');
assertEquals(string.byteCut(25), '구글 주식회사는 미국의 다국적 기업이다. 19...');
assertEquals(string.byteCut(40), "구글 주식회사는 미국의 다국적 기업이다. 1998년에 'BackRub'이라는 이름으...");

assertThrows(function() { String.prototype.byteCut.apply(undefined); }, TypeError);
assertThrows(function() { String.prototype.byteCut.apply(undefined, ['b']); }, TypeError);
assertThrows(function() { String.prototype.byteCut.apply(undefined, ['b', 4]); }, TypeError);
assertThrows(function() { String.prototype.byteCut.apply(null); }, TypeError);
assertThrows(function() { String.prototype.byteCut.apply(null, ['b']); }, TypeError);
assertThrows(function() { String.prototype.byteCut.apply(null, ['b', 4]); }, TypeError);
assertEquals(String.prototype.byteCut.apply(42, ['2']), false);
assertEquals(String.prototype.byteCut.apply(42, ['4']), false);
assertEquals(String.prototype.byteCut.apply(42, ['b', 4]), false);
assertEquals(String.prototype.byteCut.apply(42, ['2', 1]), false);
assertEquals(String.prototype.byteCut.apply(42, ['2', 4]), false);
assertEquals(String.prototype.byteCut.apply({ 'toString': function() { return 'abc'; } }, ['b', 0]), false);
assertEquals(String.prototype.byteCut.apply({ 'toString': function() { return 'abc'; } }, ['b', 1]), false);
assertEquals(String.prototype.byteCut.apply({ 'toString': function() { return 'abc'; } }, ['b', 2]), false);

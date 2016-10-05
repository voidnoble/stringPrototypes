/**
 * String 도우미 함수들
 *
 * Usage:
 *
 * require('./helpers/stringHelper');
 *
 * let str = "bla bla bla";
 *
 * console.log( str.byteCut(10) );
 */

/**
 * 문자열의 바이트 길이 구하기
 */
if (!String.prototype.byteLength) {
    (function() {
        'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
        var defineProperty = (function() {
            // IE 8 only supports `Object.defineProperty` on DOM elements
            try {
                var object = {};
                var $defineProperty = Object.defineProperty;
                var result = $defineProperty(object, object, object) && $defineProperty;
            } catch(error) {}
            return result;
        }());
        var toString = {}.toString;
        var byteLength = function(len) {
            if (this == null) {
                throw TypeError();
            }
            var string = String(this);
            if (len && toString.call(len) == '[object RegExp]') {
                throw TypeError();
            }
            var str = this;
            var length = 0;
            for(var i = 0; i < str.length; i++) {
                if(escape(str.charAt(i)).length >= 4)
                    length += 2;
                else if(escape(str.charAt(i)) == "%A7")
                    length += 2;
                else
                    if(escape(str.charAt(i)) != "%0D")
                        length++;
            }
            return length;
        };
        if (defineProperty) {
            defineProperty(String.prototype, 'byteLength', {
                'value': byteLength,
                'configurable': true,
                'writable': true
            });
        } else {
            String.prototype.byteLength = byteLength;
        }
    }());
}

/**
 * 문자열을 한글 1자를 2Byte 인식하여 자름
 * 파라미터 길이 넘으면 말줄임표 붙여 반환
 */
if (!String.prototype.byteCut) {
    (function() {
        'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
        var defineProperty = (function() {
            // IE 8 only supports `Object.defineProperty` on DOM elements
            try {
                var object = {};
                var $defineProperty = Object.defineProperty;
                var result = $defineProperty(object, object, object) && $defineProperty;
            } catch(error) {}
            return result;
        }());
        var toString = {}.toString;
        var byteCut = function(len) {
            if (this == null) {
                throw TypeError();
            }
            if (!len || !Number.isInteger(len)) return false;
            var string = String(this);
            if (len && toString.call(len) == '[object RegExp]') {
                throw TypeError();
            }
            var str = this;
            if (!str || str == 'null') return false;
            var count = 0;
            len *= 2;   // Hangul 1 Char = 2byte
            var suffix = '';
            var strByteLength = str.byteLength();
            if (strByteLength > len) {
                len = len / 2;
                len -= (strByteLength % 2 == 0)? 3 : 4;   // for suffix '...'
                len *= 2;
                suffix = '...';
            }
            for (var i = 0; i < str.length; i++) {
                if(escape(str.charAt(i)).length >= 4) {
                    count += 2;
                } else {
                    if (escape(str.charAt(i)) != "%0D") count++;
                }

                if(count > len) {
                    if(escape(str.charAt(i)) == "%0A") i--;
                    break;
                }
            }
            return str.substring(0, i) + suffix;
        };
        if (defineProperty) {
            defineProperty(String.prototype, 'byteCut', {
                'value': byteCut,
                'configurable': true,
                'writable': true
            });
        } else {
            String.prototype.byteCut = byteCut;
        }
    }());
}

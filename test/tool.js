'use strict';

const {
  curry,
  isArray,
  isCollection,
  isFunction,
  isNumber,
  isPlainObject,
  isString,
  isUndefined,
  toString,
} = require('../lib/tool');
const test = require('tape');

test('curry()', t => {
  const add = curry((a, b, c) => a + b + c);
  t.equal(add(1, 2, 3), 6);
  t.equal(add(1, 2)(3), 6);
  t.equal(add(1)(2, 3), 6);
  t.equal(add(1)(2)(3), 6);
  t.end();
});

test('isArray()', t => {
  t.ok(isArray([]));
  t.end();
});

test('isCollection()', t => {
  t.notOk(isCollection(null));
  t.ok(isCollection([]));
  t.ok(isCollection({}));
  t.end();
});

test('isFunction()', t => {
  t.notOk(isFunction(null));
  t.ok(isFunction(function () {}));
  t.ok(isFunction(() => {}));
  t.end();
});

test('isNumber()', t => {
  t.notOk(isNumber(null));
  t.ok(isNumber(0));
  t.end();
});

test('isPlainObject()', t => {
  t.notOk(isPlainObject(null));
  t.ok(isPlainObject({}));
  t.end();
});

test('isString()', t => {
  t.notOk(isString(null));
  t.notOk(isString());
  t.ok(isString(''));
  t.end();
});

test('isUndefined()', t => {
  t.notOk(isUndefined(null));
  t.ok(isUndefined(void 0));
  t.ok(isUndefined());
  t.end();
});

test('toString()', t => {
  t.equal(toString([]), '[object Array]');
  t.equal(toString({}), '[object Object]');
  t.end();
});

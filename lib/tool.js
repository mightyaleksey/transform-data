'use strict';

const objectTag = '[object Object]';

const bind = Function.prototype.bind;
const call = Function.prototype.call;
const isArray = Array.isArray;
const toString = bind.call(call, Object.prototype.toString);

exports.constant = constant;
exports.curry = curry;
exports.identity = identity;
exports.isArray = isArray;
exports.isCollection = isCollection;
exports.isFunction = isFunction;
exports.isNumber = isNumber;
exports.isObjectLike = isObjectLike;
exports.isPlainObject = isPlainObject;
exports.isString = isString;
exports.isUndefined = isUndefined;
exports.split = split;
exports.toString = toString;

/**
 * @param  {*} a
 * @return {function}
 */
function constant(a) {
  return constantly;

  function constantly() {
    return a;
  }
}

/**
 * @param  {function} fn
 * @return {function}
 */
function curry(fn) {
  const argsLength = fn.length;
  return curried;

  function curried() {
    if (arguments.length >= argsLength) return fn.apply(this, arguments);

    const args = [this];
    const length = arguments.length;
    for (var p = 0; p < length; ++p) {
      args.push(arguments[p]);
    }

    return bind.apply(curried, args);
  }
}

/**
 * @param  {*} a
 * @return {*}
 */
function identity(a) {
  return a;
}

/**
 * @param  {*} a
 * @return {boolean}
 */
function isCollection(a) {
  return isArray(a) || isPlainObject(a);
}

/**
 * @param  {*} a
 * @return {boolean}
 */
function isFunction(a) {
  return typeof a === 'function';
}

/**
 * @param  {*} a
 * @return {boolean}
 */
function isNumber(a) {
  return typeof a === 'number';
}

/**
 * @param  {*} a
 * @return {boolean}
 */
function isObjectLike(a) {
  return typeof a === 'object';
}

/**
 * @param  {*} a
 * @return {boolean}
 */
function isPlainObject(a) {
  return isObjectLike(a) && toString(a) === objectTag;
}

/**
 * @param  {*} a
 * @return {boolean}
 */
function isString(a) {
  return typeof a === 'string';
}

/**
 * @param  {*} a
 * @return {boolean}
 */
function isUndefined(a) {
  return a === undefined;
}

/**
 * @param  {function} prim
 * @param  {function} col
 * @return {function}
 */
function split(prim, col = identity) {
  return splitter;

  function splitter(_1, _2, isCol) {
    return isCol
      ? col.apply(this, arguments)
      : prim.apply(this, arguments);
  }
}

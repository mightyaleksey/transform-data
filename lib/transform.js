'use strict';

const { curry, isArray, isCollection, isPlainObject } = require('./tool');

module.exports = curry(transform);

/**
 * @param  {function} xf
 * @param  {function} f
 * @param  {*} col
 * @return {*}
 */
function transform(xf, f, col) {
  return xform(xf, f, col, '');
}

/**
 * @param  {function} xf
 * @param  {function} f
 * @param  {*} col
 * @param  {string} ctx
 * @return {*}
 */
function xform(xf, f, col, ctx) {
  const nextCol = xf(col, ctx, isCollection(col));
  if (isArray(nextCol))
    return iterate(accArr, idArr, xf, f, [], nextCol, ctx);
  if (isPlainObject(nextCol))
    return iterate(accObj, idObj, xf, f, {}, nextCol, ctx);
  return nextCol;
}

/**
 * @param  {function} acc
 * @param  {function} idfy
 * @param  {function} xf
 * @param  {function} f
 * @param  {array|object} init
 * @param  {array|object} col
 * @param  {string} ctx
 * @return {array|object}
 */
function iterate(acc, idfy, xf, f, init, col, ctx) {
  for (const key in col) {
    const val = col[key];
    const nextCtx = idfy(ctx, key);
    if (f(val, nextCtx, isCollection(val)) !== true) continue;
    acc(init, xform(xf, f, val, nextCtx), key);
  }

  return init;
}

/**
 * @param  {array} result
 * @param  {*} val
 * @return {array}
 */
function accArr(result, val) {
  result.push(val);
  return result;
}

/**
 * @param  {object} result
 * @param  {*} val
 * @param  {string} key
 * @return {object}
 */
function accObj(result, val, key) {
  result[key] = val;
  return result;
}

/**
 * @param  {string} ctx
 * @param  {string} key
 * @return {string}
 */
function idArr(ctx, key) {
  return `${ctx}[${key}]`;
}

/**
 * @param  {string} ctx
 * @param  {string} key
 * @return {string}
 */
function idObj(ctx, key) {
  return ctx
    ? `${ctx}.${key}`
    : key;
}

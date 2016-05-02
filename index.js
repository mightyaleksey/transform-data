var toString = Object.prototype.toString;

/**
 * @param  {*} a
 * @return {boolean}
 */
function isArray(a) {
  return Array.isArray(a);
}

/**
 * @param  {*} a
 * @return {boolean}
 */
function isBoolean(a) {
  return typeof a === 'boolean';
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
function isPlainObject(a) {
  return a && toString.call(a) === '[object Object]';
}

/**
 * @param  {*} a
 * @return {boolean}
 */
function isUndefined(a) {
  return typeof a === 'undefined';
}

/**
 * @param  {function} fn
 * @return {function}
 */
function negate(fn) {
  return function negateValue(a) {
    return !fn(a);
  };
}

/**
 * private
 * @param  {array} collection
 * @param  {*}     element
 * @return {array}
 */
function accumulateArray(collection, element) {
  isUndefined(element) || collection.push(element);
  return collection;
}

/**
 * private
 * @param  {object} collection
 * @param  {*}      element
 * @param  {string} key
 * @return {object}
 */
function accumulateObject(collection, element, key) {
  isUndefined(element) || (collection[key] = element);
  return collection;
}

/**
 * @param {...function} transformations
 * @return {function}
 */
function compose(...transformations) {
  var length = arguments.length;
  for (var transformations = [], i = 0; i < length; ++i) transformations[i] = arguments[i];

  return function composition(elem, key, rCol) {
    var rElem = elem;
    var index = length;

    while (index--) {
      rElem = transformations[index](rElem, key, rCol);
    }

    return rElem;
  }
}

/**
 * @param  {function} predicate
 * @return {function}
 */
function filter(predicate) {
  function filterByPredicate(elem, key, rCol) {
    return predicate(elem, key, rCol) === true
      ? elem
      : void 0;
  };

  filterByPredicate.displayName = predicate.name + 'Filter';

  return filterByPredicate;
}


/**
 * @param  {function} predicate
 * @return {function}
 */
function filterValues(predicate) {
  function filterValuesByPredicate(elem, key, rCol) {
    return isArray(elem) || isPlainObject(elem) || predicate(elem, key, rCol) === true
      ? elem
      : void 0;
  };

  filterValuesByPredicate.displayName = predicate.name + 'FilterValues';

  return filterValuesByPredicate;
}

/**
 * @param  {function}     fn
 * @param  {*}            col
 * @param  {string}       key
 * @param  {array|object} rCol
 * @return {*}
 */
function transform(fn, col, key, rCol) {
  if (isArray(col)) return fn(transformCollection(accumulateArray, fn, col, []), key, rCol);
  if (isPlainObject(col)) return fn(transformCollection(accumulateObject, fn, col, {}), key, rCol);
  return fn(col, key, rCol);
}

/**
 * @private
 * @param  {function}     accumulate
 * @param  {function}     fn
 * @param  {array|object} col
 * @param  {array|object} rCol
 * @return {array|object}
 */
function transformCollection(accumulate, fn, col, rCol) {
  for (var key in col) {
    accumulate(rCol, transform(fn, col[key], key, col), key);
  }

  return rCol;
}

module.exports = transform;
module.exports.compose = compose;
module.exports.filter = filter;
module.exports.filterValues = filterValues;
module.exports.isArray = isArray;
module.exports.isBoolean = isBoolean;
module.exports.isNumber = isNumber;
module.exports.isPlainObject = isPlainObject;
module.exports.isUndefined = isUndefined;
module.exports.negate = negate;
module.exports.transform = transform;

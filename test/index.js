const test = require('tape');
const transform = require('../index');
const {
  compose,
  filter,
  filterValues,
  isArray,
  isBoolean,
  isNumber,
  isPlainObject,
  isUndefined,
  negate,
} = transform;

test('transform()', t => {
  t.test('- should copy an array', q => {
    const value = [1, 2, 3];
    const result = transform(a => a, value);
    q.notEqual(result, value, 'should copy an element');
    q.deepEqual(result, value, 'elements should be equal');
    q.end();
  });

  t.test('- should copy an object', q => {
    const value = {a: 5};
    const result = transform(a => a, value);
    q.notEqual(result, value, 'should copy an element');
    q.deepEqual(result, value, 'elements should be equal');
    q.end();
  });

  t.test('- should copy a nested data structure', q => {
    const value = {a: [1, 2], b: {c: null}};
    const result = transform(a => a, value);
    q.notEqual(result, value, 'should copy an element');
    q.notEqual(result.a, value.a, 'should copy an element');
    q.notEqual(result.b, value.b, 'should copy an element');
    q.deepEqual(result, value, 'elements should be equal');
    q.end();
  });

  t.test('- should increment values', q => {
    // Since the collection will be presented too we should add type checker
    const increment = a => isNumber(a)
      ? a + 1
      : a;

    const values = [1, 2, 3];
    const result = transform(increment, values);
    q.deepEqual(result, [2, 3, 4]);
    q.end();
  });
});

test('compose()', t => {
  // Since the collection will be presented too we should add type checker
  const increment = a => isNumber(a)
    ? a + 1
    : a;

  const value = {bool: false, a: {num: 6}, str: 'yep'};
  const result = transform(compose(increment, filterValues(isNumber)), value);
  t.deepEqual(result, {a: {num: 7}});
  t.end();
});

test('filterValues()', t => {
  const value = {bool: false, num: 5, str: 'yep'};
  const result = transform(filterValues(negate(isBoolean)), value);
  t.deepEqual(result, {num: 5, str: 'yep'});
  t.end();
});

test('isArray()', t => {
  t.ok(isArray([]), 'should be true for an array value');
  t.notOk(isArray({}), 'should be false for an object value');
  t.notOk(isArray(0), 'should be false for a number value');
  t.notOk(isArray(''), 'should be false for a string value');
  t.notOk(isArray(null), 'should be false for a null value');
  t.notOk(isArray(false), 'should be false for a boolean value');
  t.notOk(isArray(void 0), 'should be false for an undefined value');
  t.end();
});

test('isPlainObject()', t => {
  t.notOk(isPlainObject([]), 'should be false for an array value');
  t.ok(isPlainObject({}), 'should be true for an object value');
  t.notOk(isPlainObject(0), 'should be false for a number value');
  t.notOk(isPlainObject(''), 'should be false for a string value');
  t.notOk(isPlainObject(null), 'should be false for a null value');
  t.notOk(isPlainObject(false), 'should be false for a boolean value');
  t.notOk(isPlainObject(void 0), 'should be false for an undefined value');
  t.end();
});

test('isUndefined()', t => {
  t.notOk(isUndefined([]), 'should be false for an array value');
  t.notOk(isUndefined({}), 'should be false for an object value');
  t.notOk(isUndefined(0), 'should be false for a number value');
  t.notOk(isUndefined(''), 'should be false for a string value');
  t.notOk(isUndefined(null), 'should be false for a null value');
  t.notOk(isUndefined(false), 'should be false for a boolean value');
  t.ok(isUndefined(void 0), 'should be true for an undefined value');
  t.end();
});

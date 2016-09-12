'use strict';

const { constant, identity, splitter } = require('../lib/tool');
const spy = require('spy');
const test = require('tape');
const transform = require('../lib/transform');

test('transform() - flat copy', t => {
  const arrSrc = [0, 1, 2, 3];
  const arrCopy = transform(identity, constant(true), arrSrc);
  t.deepEqual(arrCopy, arrSrc);
  t.notEqual(arrCopy, arrSrc);

  const objSrc = {a: 5, b: 4};
  const objCopy = transform(identity, constant(true), objSrc);
  t.deepEqual(objCopy, objSrc);
  t.notEqual(arrCopy, objSrc);

  t.end();
});

test('transform() - flat transformation', t => {
  const inc = a => a + 1;
  const isOdd = a => a % 2 !== 0;
  t.deepEqual(transform(splitter(inc), isOdd, [0, 1, 2, 3]), [2, 4]);
  t.deepEqual(transform(splitter(inc), isOdd, {a: 5, b: 4}), {a: 6});
  t.end();
});

test('transform() - nested copy', t => {
  const source = [
    {a: [0, 1], b: null},
    {c: undefined},
  ];

  const result = transform(identity, constant(true), source);

  t.deepEqual(result, source);
  t.notEqual(result[0], source[0]);
  t.notEqual(result[1], source[1]);
  t.end();
});

test('transform() - context', t => {
  const id = spy(identity);
  const truthy = spy(constant(true));
  const source = {a: {b: [{c: 3}, {c: 4}]}};
  const result = transform(id, truthy, source);
  t.deepEqual(result, source);
  t.equal(truthy.callCount, 6);
  t.ok(truthy.calls[0].calledWithExactly(source.a, 'a', true));
  t.ok(truthy.calls[1].calledWithExactly(source.a.b, 'a.b', true));
  t.ok(truthy.calls[2].calledWithExactly(source.a.b[0], 'a.b[0]', true));
  t.ok(truthy.calls[3].calledWithExactly(source.a.b[0].c, 'a.b[0].c', false));
  t.ok(truthy.calls[4].calledWithExactly(source.a.b[1], 'a.b[1]', true));
  t.ok(truthy.calls[5].calledWithExactly(source.a.b[1].c, 'a.b[1].c', false));
  t.equal(id.callCount, 7);
  t.ok(id.calls[0].calledWithExactly(source, '', true));
  t.ok(id.calls[1].calledWithExactly(source.a, 'a', true));
  t.ok(id.calls[2].calledWithExactly(source.a.b, 'a.b', true));
  t.ok(id.calls[3].calledWithExactly(source.a.b[0], 'a.b[0]', true));
  t.ok(id.calls[4].calledWithExactly(source.a.b[0].c, 'a.b[0].c', false));
  t.ok(id.calls[5].calledWithExactly(source.a.b[1], 'a.b[1]', true));
  t.ok(id.calls[6].calledWithExactly(source.a.b[1].c, 'a.b[1].c', false));
  t.end();
});

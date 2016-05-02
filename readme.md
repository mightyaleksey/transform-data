transform-data
==============

Set of functions to build algorithmic transformations for data structures.

Small attempt of mine to make transformations flexible and simple. Since I learn the subject API may change in future.


## Installation

I assume that you use [node.js](https://nodejs.org/en/) or any bundling system with commonJs module support. To install it simply run the command below:

```bash
npm install transform-data
```


## Usage

Current module exports function to apply transformations to the complex data structures and also contains helpers to build transformations easier.


### transform

```javascript
const transform = require('transform');
const identity = a => a;

transform(identity, {a: 5}); // returns a copy of {a: 5}.
```

Arguments:

- `fn (function)` — function which is used to apply transformations to the values. In case you need a deep copy of data you should provide an I combinator (`const identity = a => a;`). Accepts element, key and source collection like with the regular map function as arguments.
- `collection (array|object)` — collection to transform.


### compose

Creates a composition of functions, similar to `a(b(c(value)))`.

```javascript
const transform = require('transform');
const { compose, filterValues, isNumber } = transform;

// Since the collection will be presented too we should add type checker
const increment = a => isNumber(a)
  ? a + 1
  : a;

const value = {bool: false, a: {num: 6}, str: 'yep'};
transform(compose(increment, filterValues(isNumber)), value);
// {a: {num: 7}}
```

Arguments:

- `...fn` — set of functions to make a composition. Should be provided as a multiple arguments.


### filter

A helper to filter elements using boolean predicate. Accepts another function, which returns boolean value.

```javascript
const transform = require('transform');
const { filter } = transform;
// coming soon :)
```

Arguments:

- `predicate (function)` — function to determine whether value should be filtered or not. Should return the boolean value.


### filterValues

A helper to filter elements using boolean predicate. Unlike `filter` it accepts only values and skips collections. Accepts another function, which returns boolean value.

```javascript
const transform = require('transform');
const { filterValues, isBoolean, negate } = transform;

transform(filterValues(negate(isBoolean)), {bool: false, num: 5, str: 'yep'});
// {bool: false}
```

Arguments:

- `predicate (function)` — function to determine whether value should be filtered or not. Should return the boolean value.


## License

> The MIT License

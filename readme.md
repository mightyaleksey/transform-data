transform-data
==============

Set of functions to build algorithmic transformations for data structures.

Small attempt of mine to make transformations of data structures simplier.


## Installation

I assume that you use [node.js](https://nodejs.org/en/) or any bundling system with commonJs module support. To install it simply run the command below:

```bash
npm install transform-data
```


## Usage

Current module exports function to apply transformations to the complex data structures and also contains helpers to build transformations easier.

All the helpers are provided with the [`lib/tool`](lib/tool.js) module.


### transform(xf, f, col)

Arguments:

- `xf(val, keypath, isCollection)` — function which is used to apply transformation.
- `f(val, keypath, isCollection)` - function which is used to reduce the resulting collection.
- `col (array|object)` - the collection itself.

Example:

```javascript
const { constant, identity } = require('lodash/fp');
const transform = require('transform-data');

// returns a deep copy of provided data structure
transform(identity, constant(true), {a: {b: 5}}); // {a: {b: 5}}

const { splitter } = require('transform-data/lib/tool');
const inc = a => a + 1;
const isOdd = a => a % 2 !== 0;

transform(splitter(inc), isOdd, [0, 1, 2, 3]); // [2, 4]
```


### lib/tool module

Helpers:

- `constant (funciton)`
- `curry (funciton)`
- `identity (funciton)`
- `isArray (funciton)`
- `isCollection (funciton)`
- `isFunction (funciton)`
- `isNumber (funciton)`
- `isObjectLike (funciton)`
- `isPlainObject (funciton)`
- `isString (funciton)`
- `isUndefined (funciton)`
- `splitter(primitive, collection = identity)`
- `toString (funciton)`


## License

> The MIT License

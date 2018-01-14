# ls-map-wrap

[![Build Status][travis-image]][travis-url] 
[![Coverage][coveralls-image]][coveralls-url] 
[![dependencies][dependencies-image]][dependencies-url]
[![dev dependencies][dev-dependencies-image]][dev-dependencies-url]
[![License: MIT][MIT-image]][MIT-url]

A wrapper around localstorage, so it can be used as a Map

## Getting Started

Install it via npm:

```shell
npm install ls-map-wrap
```

And include in your project:

```javascript
// Using ESM
import lsMapWrap from 'ls-map-wrap';
// Or using CJS
const lsMapWrap = require('ls-map-wrap');
```

## Usage 

```javascript
import lsMapWrap from 'ls-map-wrap';

lsMapWrap.set('key', {ultimateAnswer: 42});
lsMapWrap.get('key'); // {ultimateAnswer: 42}
lsMapWrap.has('key'); // true

// works with values not typically handled by JSON.stringify/parse
lsMapWrap.set('nan', NaN);
Number.isNaN(lsMapWrap.get('nan')); // true

// works with functions too
lsMapWrap.set('simpleFn', () => console.log('hello'));
const fn = lsMapWrap.get('simpleFn');
fn(); // hello is logged to the console

lsMapWrap.delete('key');
lsMapWrap.has('key'); // false

lsMapWrap.clear();
lsMapWrap.has('nan'); // false
```

## API 

Implements all of the functions nessecary to drop it in place for an in-memory map

### get(key)

Returns the value for the given key

#### key

Type: `string`

### set(key, value)

Saves the value in localstorage for the given key

#### key

Type: `string`

#### value

Type: `any`

### has(key)

Returns true if the map (localStorage) contains this value, false otherwise

#### key

Type: `string`

### delete(key)

Removes the value from the map with the given key

#### key

Type: `string`

### clear()

Removes all values from the map (localStorage)

[travis-url]: https://travis-ci.org/mdvorscak/ls-map-wrap
[travis-image]: https://img.shields.io/travis/mdvorscak/ls-map-wrap/master.svg?style=for-the-badge

[coveralls-url]: https://coveralls.io/r/mdvorscak/ls-map-wrap?branch=master
[coveralls-image]: https://img.shields.io/coveralls/github/mdvorscak/ls-map-wrap/master.svg?style=for-the-badge

[dependencies-url]: https://david-dm.org/mdvorscak/ls-map-wrap
[dependencies-image]: https://img.shields.io/david/mdvorscak/ls-map-wrap.svg?style=for-the-badge

[dev-dependencies-url]: https://david-dm.org/mdvorscak/ls-map-wrap/?type=dev
[dev-dependencies-image]: https://img.shields.io/david/dev/mdvorscak/ls-map-wrap.svg?style=for-the-badge

[MIT-url]: https://opensource.org/licenses/MIT
[MIT-image]: https://img.shields.io/github/license/mashape/apistatus.svg?style=for-the-badge
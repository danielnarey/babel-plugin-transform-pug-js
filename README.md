# babel-plugin-transform-pug-js [![Build Status](https://travis-ci.com/danielnarey/babel-plugin-transform-pug-js.svg?branch=master)](https://travis-ci.com/danielnarey/babel-plugin-transform-pug-js) [![npm](https://img.shields.io/npm/v/babel-plugin-transform-pug-js)](https://www.npmjs.com/package/babel-plugin-transform-pug-js) ![npm bundle size](https://img.shields.io/bundlephobia/min/babel-plugin-transform-pug-js)

*Transpile [Pug](https://pugjs.org/api/getting-started.html) templates anywhere into JS functions for client-side rendering*


## Usage

When this plugin is added to your Babel configuration, the tagged template assigned to `greeting` in the following code will be transpiled into a JavaScript function that takes a data object as an argument and returns a string of HTML.


```js

const greeting = pug`
  p Hello,
    em= name
`;

const data = { name: 'Daniel' };

myElement.innerHTML = greeting(data); // => '<p>Hello,<em>Daniel</em></p>'

```


## Acknowledgement

The [babel-plugin-transform-pug-html](https://github.com/dumconstantin/babel-plugin-transform-pug-html) package by @dumconstantin provided a starting point for developing this plugin.

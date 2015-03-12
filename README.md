# defekt

defekt is custom errors made simple.

![defekt](https://github.com/thenativeweb/defekt/raw/master/images/logo.jpg "defekt")

## Installation

    $ npm install defekt

## Quick start

First you need to add a reference to defekt in your application.

```javascript
var defekt = require('defekt');
```

Then call the `defekt` function and hand over an array of custom error names that you would like to have created.

```javascript
var errors = defekt([
  'ArgumentNull',
  'InvalidOperation',
  '...'
]);
```

The result is an object containing all the errors you specified. To use one of those errors, simply call the appropriate function with `new` and throw it.

```javascript
throw new errors.InvalidOperation();
```

If you want to specify a message, feel free to do so.

```javascript
throw new errors.InvalidOperation('Something failed.');
```

Additionally, if an error was caused by another error, you can specify this error as the second parameter.

```javascript
throw new errors.InvalidOperation('Something failed.', new Error(...));
```

The custom errors follow the same rules as the built-in ones, i.e. they have a `name` and a `message` property, they derive from `Error` and they can be recognized by the `util.isError` function.

## Running the build

This module can be built using [Grunt](http://gruntjs.com/). Besides running the tests, this also analyses the code. To run Grunt, go to the folder where you have installed defekt and run `grunt`. You need to have [grunt-cli](https://github.com/gruntjs/grunt-cli) installed.

    $ grunt

## License

The MIT License (MIT)
Copyright (c) 2015 the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

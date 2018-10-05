# defekt

defekt is custom errors made simple.

![defekt](https://github.com/thenativeweb/defekt/raw/master/images/logo.jpg "defekt")

## Installation

```shell
$ npm install defekt
```

## Quick start

First you need to add a reference to defekt in your application:

```javascript
const defekt = require('defekt');
```

Then call the `defekt` function and hand over an array of custom error names that you would like to have created:

```javascript
const errors = defekt([
  'ArgumentNull',
  'InvalidOperation',
  '...'
]);
```

The result is an object containing all the errors you specified. To use one of those errors, simply call the appropriate function with `new` and throw it:

```javascript
throw new errors.InvalidOperation();
```

By default, the error name is also used as the error message, but converted to a human readable form. E.g., the error name `InvalidOperation` becomes the message `Invalid operation.`:

```javascript
try {
  throw new errors.InvalidOperation();
} catch (ex) {
  console.log(ex.message);
  // => 'Invalid operation.'
}
```

If you want to specify a custom message, feel free to do so:

```javascript
throw new errors.InvalidOperation('Something failed.');
```

Additionally, if an error was caused by another error, you can specify this error as the second parameter:

```javascript
throw new errors.InvalidOperation('Something failed.', new Error(...));
```

The custom errors follow the same rules as the built-in ones, i.e. they have a `name` and a `message` property, they derive from `Error` and they can be recognized by the `util.isError` function.

### Defining error codes

By default, each custom error uses its uppercased name with an `E` prefix as error code. E.g., an `InvalidOperation` error uses `EINVALIDOPERATION` as its code.

From time to time, you may want to provide custom error codes. For that specify an object with a `name` and a `code` property instead of only providing the error name:

```javascript
const errors = defekt([
  { name: 'ArgumentNull', code: 'ARGNULL' },
  { name: 'InvalidOperation', code: 'INVALOP' },
  { name: '...', code: '...' }
]);
```

Please note that you can mix both definition types arbitrarily.

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter):

```shell
$ npx roboter
```

## License

The MIT License (MIT)
Copyright (c) 2015-2018 the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# defekt

defekt is custom errors made simple.

![defekt](https://github.com/thenativeweb/defekt/raw/master/images/logo.jpg "defekt")

## Status

| Category         | Status                                                                                                                                   |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Version          | [![npm](https://img.shields.io/npm/v/defekt)](https://www.npmjs.com/package/defekt)                                                      |
| Dependencies     | ![David](https://img.shields.io/david/thenativeweb/defekt)                                                                               |
| Dev dependencies | ![David](https://img.shields.io/david/dev/thenativeweb/defekt)                                                                           |
| Build            | [![CircleCI](https://img.shields.io/circleci/build/github/thenativeweb/defekt)](https://circleci.com/gh/thenativeweb/defekt/tree/master) |
| License          | ![GitHub](https://img.shields.io/github/license/thenativeweb/defekt)                                                                     |

## Installation

```shell
$ npm install defekt
```

## Quick start

First you need to add a reference to defekt in your application:

```javascript
const { defekt } = require('defekt');
```

If you use TypeScript, use the following code instead:

```typescript
import { defekt } from 'defekt';
```

Then call the `defekt` function and hand over an object of custom error configurations that you would like to have created. In this object each key is the name for an error and the corresponding value is the error's configuration.

```javascript
const errors = defekt({
  ArgumentNull: {},
  InvalidOperation: {},
  // ...
});
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

Additionally, if an error was caused by another error, you can specify this error using the `cause` property:

```javascript
throw new errors.InvalidOperation('Something failed.', {
  cause: new Error(...)
});
```

From time to time, you may need to provide additional data for an error. For this, you can use the `data` property:

```javascript
throw new errors.InvalidOperation('Something failed.', {
  data: { ... }
});
```

The custom errors follow the same rules as the built-in ones, i.e. they have a `name` and a `message` property, they derive from `Error` and they can be recognized by the `util.isError` function.

### Defining error codes

By default, each custom error uses its uppercased name with an `E` prefix as error code. E.g., an `InvalidOperation` error uses `EINVALIDOPERATION` as its code.

From time to time, you may want to provide custom error codes. For that specify a `code` property on the configuration object:

```javascript
const errors = defekt({
  ArgumentNull: { code: 'ARGNULL' },
  InvalidOperation: { code: 'INVALOP' }
  // ...
});
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter):

```shell
$ npx roboter
```

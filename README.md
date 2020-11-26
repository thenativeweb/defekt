# defekt

defekt is custom errors made simple.

![defekt](https://github.com/thenativeweb/defekt/raw/master/images/logo.jpg "defekt")

## Status

| Category         | Status                                                                                              |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| Version          | [![npm](https://img.shields.io/npm/v/defekt)](https://www.npmjs.com/package/defekt)                 |
| Dependencies     | ![David](https://img.shields.io/david/thenativeweb/defekt)                                          |
| Dev dependencies | ![David](https://img.shields.io/david/dev/thenativeweb/defekt)                                      |
| Build            | ![GitHub Actions](https://github.com/thenativeweb/defekt/workflows/Release/badge.svg?branch=master) |
| License          | ![GitHub](https://img.shields.io/github/license/thenativeweb/defekt)                                |

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

### Grouping errors

Over time you may get more and more error definitions, which results in a lengthy `errors` object. To group errors, add appropriate properties to the `errors` object and call the `defekt` function multiple times:

```javascript
const errors = {
  common: defekt({
    ArgumentNull: {},
    InvalidOperation: {}
    // ...
  }),

  http: defekt({
    BadRequest: {}
    // ...
  })
};
```

### Comparing errors

To tell your errors apart, you sometimes want to compare them – usually based on their error code. To prevent you from using magic strings all over your application, you can use the static `code` property on the error constructors:

```javascript
const errors = defekt({
  ArgumentNull: {},
  InvalidOperation: {}
  // ...
});

const error = new errors.InvalidOperation();

if (error.code === errors.InvalidOperation.code) {
  // ...
}
```

Alternatively, if you catch an error from somewhere and there are multiple options, you can use the error codes in a `switch` statement:

```javascript
try {
  // ...
} catch (ex) {
  switch (ex.code) {
    case errors.ArgumentNull.code: {
      // ...
      break;
    }
    case errors.InvalidOperation.code: {
      // ...
      break;
    }
    default: {
      throw ex;
    }
  }
}
```

### Recognizing `CustomError`s

Since version 4.0 TypeScript allows [`unknown` on `catch` clause bindings](https://devblogs.microsoft.com/typescript/announcing-typescript-4-0/#unknown-on-catch). Typing exceptions as `unknown` reduces the assumptions made about their content and forces you to examine your exceptions more closely when handling them. `defekt` provides a type predicate to check for `CustomError`s:

```typescript
import { isCustomError } from 'defekt';

try {
  // ...
} catch (ex: unknown) {
  if (isCustomError(ex)) {
    switch (ex.code) {
      // ...
    }
  }
  // Rethrow or check for other known non-defekt error types here.
}
```

### Recognizing JavaScript `Error`s

In addition to `CustomError`s and helpers related to those, `defekt` provides some tooling to work with native JavaScript `Error`s. Since TypeScript 4.0 caught exceptions can by annotated as `undefined` (see [Typescript 4.0 release notes](https://devblogs.microsoft.com/typescript/announcing-typescript-4-0/#unknown-on-catch)). Our [eslint rules](https://github.com/thenativeweb/eslint-config-es) require us to use `unknown` over `any`, since it is more correct and defensive.

This requires developers to work with type guards to ensure that a caught error is actually an `Error`. Use `isError` for this:

```typescript
import { isError } from 'defekt';

try {
  // ...
} catch (ex: unknown) {
  if (!isError(ex)) {
    // ex is unfortunately something really weird. You might want to get rid of whatever library is causing this.
    throw ex;
  }
  // ...
}
```

## Running quality assurance

To run quality assurance for this module use [roboter](https://www.npmjs.com/package/roboter):

```shell
$ npx roboter
```

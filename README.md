# defekt

defekt is custom errors made simple.

![defekt](https://github.com/thenativeweb/defekt/raw/main/images/logo.jpg "defekt")

## Status

| Category         | Status                                                                                              |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| Version          | [![npm](https://img.shields.io/npm/v/defekt)](https://www.npmjs.com/package/defekt)                 |
| Dependencies     | ![David](https://img.shields.io/david/thenativeweb/defekt)                                          |
| Dev dependencies | ![David](https://img.shields.io/david/dev/thenativeweb/defekt)                                      |
| Build            | ![GitHub Actions](https://github.com/thenativeweb/defekt/workflows/Release/badge.svg?branch=main) |
| License          | ![GitHub](https://img.shields.io/github/license/thenativeweb/defekt)                                |

## Table of Contents

- [Installation](#installation)
- [Using `defekt`](#using-defekt)
- [Using `Result`](#using-result)

## Installation

```shell
$ npm install defekt
```

## Using `defekt`

### Creating custom errors

To create custom errors, create new classes and let them extend the anonymous class created by `defekt`:

```typescript
import { defekt } from 'defekt';

class TokenMalformed extends defekt({ code: 'TokenMalformed' }) {}
class TokenExpired extends defekt({ code: 'TokenExpired' }) {}
```

The `code` identifies the error and can be used to differ between various types of errors.

You may set a `defaultMessage` that is used when displaying the error. If you don't set a `defaultMessage`, a human-readable version of the `code` is used:

```typescript
import { defekt } from 'defekt';

class TokenMalformed extends defekt({
  code: 'TokenMalformed',
  defaultMessage: 'The token is malformed.'
}) {}

class TokenExpired extends defekt({ code: 'TokenExpired' }) {}

const tokenMalformed = new TokenMalformed();
const tokenExpired = new TokenExpired();

console.log(tokenMalformed.message);
// => 'The token is malformed.'

console.log(tokenExpired.message);
// => 'Token expired.'
```

These custom errors can be used in various ways. They are, however, preferred to be passed around as objects, preferably wrapped in a `Result` type, instead of being thrown. This allows the handling of recoverable errors in a type-safe way, instead of using unchecked and unpredictable thrown exceptions or rejections.

```typescript
import { defekt, Result } from 'defekt';

class TokenMalformed extends defekt({ code: 'TokenMalformed' }) {}
class TokenExpired extends defekt({ code: 'TokenExpired' }) {}

const validateToken = function (token: string): Result<DecodedToken, TokenMalformed | TokenExpired> {
  // ...
};

const tokenResult = validateToken(rawToken);

if (tokenResult.hasError()) {
  const { error } = tokenResult;
  
  switch (error.code) {
    // TypeScript will support you here and only allow the codes of the two possible errors.
    case TokenMalformed.code: {
      // ...
    }
    case TokenExpired.code: {
      // ...
    }
  }
}
```

### Instantiating errors

The custom errors created by this package take several parameters. They provide a default message, but you can override it:

```typescript
class TokenMalformed extends defekt({ code: 'TokenMalformed' }) {}

const error = new TokenMalformed('Token is not valid JSON.');
```

You can instead provide an object, which can contain an optional cause for the error or additional data:

```typescript
class TokenMalformed extends defekt({ code: 'TokenMalformed' }) {}

try {
  // ...
} catch (ex: unknown) {
  const error = new TokenMalformed({ cause: ex });
  // ...
}

const error = new TokenMalformed({ data: { foo: 'bar' }});
```

#### Serializing, Deserializing and Hydrating errors

Sometimes you need to serialize and deserialize your errors. Afterwards they are missing their prototype-chain and `Error`-related functionality. To restore those, you can hydrate a raw object to a `CustomError`-instance:

```typescript
import { defekt, hydrateCustomError } from 'defekt';

class TokenMalformed extends defekt({ code: 'TokenMalformed' }) {}

const serializedTokenMalformedError = JSON.stringify(new TokenMalformed());

const rawEx = JSON.parse(serializedTokenMalformedError);

const ex = hydrateCustomError({ rawEx, potentialErrorConstructors: [ TokenMalformed ] }).unwrapOrThrow();
```

Note that the hydrated error is wrapped in a `Result`. If the raw error can not be hydrated using one of the given potential error constructors, an error-`Result` will be returned, which tells you, why the hydration was unsuccessful.
Also note that the `cause` of a `CustomError` is currently not hydrated, but left as-is.

Usually, JavaScript `Error`s are not well suited for JSON-serialization. To improve this, the `CustomError` class implements [`toJSON()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#tojson_behavior), which defines custom JSON-serialization behavior. If you want to be able to serialize your `cause` and `data` as well, they need to be either plain objects or also implement the `toJSON` method.

### Using custom error type-guards

Custom errors can be type-guarded using `isCustomError`. With only one parameter it specifies an error's type to `CustomError`:

```typescript
try {
  // ...
} catch (ex: unknown) {
  if (isCustomError(error)) {
    // In this scope error is of type CustomError.
  }
  // ...
}
```

You can supply the specific custom error constructor you want to check for as the second parameter:

```typescript
class TokenMalformed extends defekt({ code: 'TokenMalformed' }) {}

try {
  // ...
} catch (ex: unknown) {
  if (isCustomError(error, TokenMalformed)) {
    // In this scope error is of type CustomError<'TokenMalformed'>.
    // This is usually functionally equivalent to the type TokenMalformed,
    // but has slight differences if e.g. you define properties on the
    // TokenMalformed class.
  }
  // ...
}
```

## Using `Result`

### What is this and why would I use it

Error handling is an integral part of reliable applications. Unfortunately, TypeScript does not provide a way to type-check exceptions or to even annotate functions with information about the exceptions they might throw. This makes all exceptions in TypeScript unchecked, unpredictable, and unreliable.

In addition to that, JavaScript - and, by extension, TypeScript - does not differentiate between recoverable errors and unrecoverable errors. We recommend the blog post [The Error Model](http://joeduffyblog.com/2016/02/07/the-error-model/) by Joe Duffy on the differences between the two kinds of errors and various ways to implement them.

This library aims to differentiate between recoverable errors and unrecoverable ones, by wrapping recoverable errors in a data structure. This approach is a more fancy version of the basic concept of error codes. Wrapping errors in data structures that have semantics is an attempt to bring concepts from languages like Haskell into TypeScript. Consider this situation:

```typescript
const configuration = await loadConfiguration();

await startServer(configuration.port ?? 3000);
```

Here, `loadConfiguration` might fail for several reasons. It might try to access the files system and fail because the configuration file does not exist. It might also fail because the configuration file is too large and the process runs out of memory. The former you want to handle since there is a default value for the port. The latter you don't want to handle, since you can't do anything about it. So imagine `loadConfiguration` would announce its recoverable errors in its signature:

```typescript
import fs from 'fs';
import { error, value } from 'defekt';

const loadConfiguration = async function (): Promise<Result<Configuration, ConfigurationNotFound>> {
  try {
    return value(
      JSON.parse(
        await fs.promises.readFile(configFilePath, 'utf8')
      )
    );
  } catch (ex) {
    if (ex.code === 'ENOENT') {
      return error(new ConfigurationNotFound({
        message: 'Failed to read configuration file.', 
        cause: ex
      }));
    }
    
    throw ex;
  }
};

const configuration = (await loadConfiguration()).unwrapOrDefault({ port: 3000 });

await startServer(configuration.port);
```

Here, any errors related to the configuration file missing are caught, propagated, and handled explicitly. If `JSON.parse` fails or if the process runs out of memory, an exception will be thrown and *not* be handled.

### Understanding the API

There are two ways to construct a `Result`. A result can either be a `ResultValue` or a `ResultError`:

```typescript
import { error, value, Result } from 'defekt';

const errorResult: Result<unknown, Error> = error(new Error());
const valueResult: Result<number, unknown> = value(5);

// Both are assignable to a Result with matching type parameters.
let result = Result<number, Error>;

result = valueResult;
result = errorResult;
```

When you get a result from a function, you can check whether it has failed and act appropriately:

```typescript
import { Result } from 'defekt';

const someResult: Result<number, Error> = calculateStuff();

if (someResult.hasError()) {
  // Propagate the error so that callers may handle it.
  return someResult;
}

console.log(someResult.value);
```

Alternatively you can use `hasValue` to achieve the opposite.

There is a more convenient solution, if you don't need to propagate your errors:

```typescript
import { Result } from 'defekt';

class TokenMalformed extends defekt({ code: 'TokenMalformed' }) {}
class TokenExpired extends defekt({ code: 'TokenExpired' }) {}

const validateToken = function (token: string): Result<DecodedToken, TokenMalformed | TokenExpired> {
  // ...
};

const token = validateToken('a token').unwrapOrDefault({ sub: 'anonymous' });

// Or, if you can't handle the possible errors appropriately and 
// instead want to throw the error, possibly crashing your application:
const token = validateToken('a token').unwrapOrThrow();

// If you want to transform the error to add additional information, or to
// fulfill a more general error type, you can also pass a callback:
const token = validateToken('a token').unwrapOrThrow(
  err => new BroaderError({ message: 'Something went wrong', cause: err })
);

// If you want to handle errors by returning a conditional default 
// value, you can use `unwrapOrElse` to supply a handler:
const token = validateToken('a token').unwrapOrElse(
  (ex) => {
    switch (ex.code) {
      case TokenMalformed.code: {
        return { sub: 'anonymous', reason: 'malformed' };
      }
      case TokenExpired.code: {
        return { sub: 'anonymous', reason: 'expired' };
      }
    }
  }
);
```

### Recognizing a `Result`

If you need to assert the type of a `Result`, you can use the `isResult` type-guard:

```typescript
import { isResult } from 'defekt';

const someValue: any = someFunction();

if (isResult(someValue)) {
  // In this scope someValue is of type Result<any, any>.
}
```

### Hydrating a `Result`

Like for errors, there is a function to hydrate a `Result` from raw data in case you need to serialize and deserialize a `Result`.

```typescript
import { defekt, hydrateResult } from 'defekt';

const rawResult = JSON.parse(resultFromSomewhere);

const hydrationResult = hydrateResult({ rawResult });

if (hydrationResult.hasError()) {
  // The hydration has failed.
} else {
  const result = hydrationResult.value;

  if (result.hasError()) {
    // Continue with your normal error handling.
  }
}
```

You can also optionally let `hydrateResult` hydrate the contained error by passing `potentialErrorConstructors`. This works identically to `hydrateResult`.

## Using the various utilities

### Recognizing errors with `isError`

The function `isError` is used to recognize anything that is derived from the built-in `Error` class. It relies solely on the prototype chain. Use it for example in a `catch` clause when trying to determine, wether what you have caught is actually an error:

```typescript
import { isError } from 'defekt';

try {
  // ...
} catch (ex: unknown) {
  if (isError(ex)) {
    // You can now access ex.message, ex.stack, ...
  }
}
```

### Recognizing custom errors with `isCustomError`

In addition to recognizing things that are derived from `Error`, `isCustomError` recognizes things that are derived from `CustomError` and even lets you identify specific error types.

You can either identify a general `CustomError`:

```typescript
import { isCustomError } from 'defekt';

try {
  // ...
} catch (ex: unknown) {
  if (isCustomError(ex)) {
    // You can now access ex.message, ex.stack, ..., but also ex.code.
  }
}
```

Or you can pass a `CustomError` constructor to make sure you have a specific type of error in hand:

```typescript
import { defekt, isCustomError } from 'defekt';

class MyCustomError extends defekt({ code: 'MyCustomError' }) {}

try {
  // ...
} catch (ex: unknown) {
  if (isCustomError(ex, MyCustomError)) {
    // In this block ex is of type `MyCustomError`.
  }
}
```

### Making sure something is an error or wrapping it, if not, using `ensureUnknownIsError`

One of the greatest regrets of JavaScript is the ability to throw anything. If you want to bullet-proof your error handling, you need to check that what you catch in a `catch` clause is actually an `Error`. `ensureUnknownIsError` takes something you caught and wraps it in an `Error` if necessary. If the caught thing already is an `Error`, `ensureUnknownIsError` returns it unchanged.

```typescript
import {ensureUnknownIsError} from "./ensureUnknownIsError";

try {
  // ...
} catch (ex: unknown) {
  const error = ensureUnknownIsError({ error: ex });

  // Now you can go on with your usual error handling and rest assured, that
  // `error` is actually an `Error`.
}
```

## Running quality assurance

To run quality assurance for this module use [roboter](https://www.npmjs.com/package/roboter):

```shell
$ npx roboter
```

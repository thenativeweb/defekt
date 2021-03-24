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

## Table of Contents

- [Installation](#installation)
- [Using `defekt`](#using-defekt)
- [Using `Result`s](#using-results)

## Installation

```shell
$ npm install defekt
```

## Using `defekt`

### Creating custom errors

To create custom errors, create new classes and let them extend the anonymous class created by `defekt`:

```typescript
import { defekt } from 'defekt';

class TokenMalformed extends defekt('TokenMalformed') {}
class TokenExpired extends defekt('TokenExpired') {}
```

The string you give to the `defekt` function determines the error's `name` and its default error message. It should be the same as the class name.

These custom errors can be used in various ways. They are, however, not intended to be thrown. They are intended to be passed around as objects, preferably wrapped in a result type. This allows the handling of recoverable errors in a type-safe way, instead of using unchecked and unpredictable thrown exceptions or rejections.

```typescript
import { defekt, fail, okay, Result } from 'defekt';

class TokenMalformed extends defekt('TokenMalformed') {}
class TokenExpired extends defekt('TokenExpired') {}

const validateToken = function (token: string): Result<DecodedToken, TokenMalformed | TokenExpired> {
  // ...
}

const token = validateToken(rawToken);

if (isFailed(token)) {
  switch (token.error.name) {
    // TypeScript will support you here and only allow the codes of the two possible defekts.
    case 'TokenMalformed': {
      // ...
    }
    case 'TokenExpired': {
      // ...
    }
  }
}
```

### Instantiating errors

The custom errors created by this package take several parameters. They provide a default message, but you can override it:

```typescript
class TokenMalformed extends defekt('TokenMalformed') {}

new TokenMalformed('Token is not valid JSON');
```

You can also provide a second parameter, which can contain an optional cause for the error or additional data:

```typescript
class TokenMalformed extends defekt('TokenMalformed') {}

try {
  // ...
} catch (ex: unknown) {
  new TokenMalformed(undefined, { cause: ex })
}

new TokenMalformed(undefined, { data: { foo: 'bar' }})
```

### Custom error type-guards

Custom errors can be type-guarded using `isCustomError`. With only one parameter it specifies an error's type to `CustomError`:

```typescript
const error: unknown;

if (isCustomError(error)) {
  // In this scope error is of type CustomError.
}
```

You can supply the specific custom error constructor you want to check for as the second parameter:

```typescript
const error: TokenMalformed | TokenInvalid;

if (isCustomError(error, TokenMalformed)) {
  // In this scope error is of type CustomError<'TokenMalformed'>.
  // This is usually functionally equivalent to the type TokenMalformed, but has slight
  // differences if you e.g. define properties on the TokenMalformed class.
}
```

## Using `Result`

### What is this and why would I use it

Error handling is an integral part of reliable applications. Unfortunately, TypeScript does not provide a way to type-check exceptions or to even annotate functions with information about the exceptions they might throw. This makes all exceptions in TypeScript unchecked, unpredictable and unreliable.

In addition to that, JavaScript - and by extension, TypeScript - does not differentiate between recoverable errors and unrecoverable errors. I recommend [this blog post by Joe Duffy](http://joeduffyblog.com/2016/02/07/the-error-model/) on the difference between the two and various ways to implement them.

This library aims to differentiate between recoverable errors and unrecoverable ones, by wrapping recoverable errors in a data structure. This approach is a more fancy version of the basic concept of error codes. Wrapping errors in data structures that have semantics is an attempt to bring concepts from languages like Haskell into TypeScript. Consider this situation:

```typescript
const configuration = await loadConfiguration();

await startServer(configuration.port ?? 3000);
```

Here, `loadConfiguration` might fail for several reasons. It might try to access the files system and fail because the config file does not exist. It might also fail because the configuration file is too large and the process runs out of memory. The former we want to handle - since we have a default value for the port. The latter we do not want to handle, since we can't do anything about it. So imagine `loadConfiguration` would announce its recoverable errors in its signature:

```typescript
import fs from 'fs';
import { fail, okay } from '@yeldirium/result';

const loadConfiguration = async function (): Promise<Result<Configuration, ConfigurationNotFound>> {
  try {
    return okay(
      JSON.parse(
        await fs.promises.readFile(configFilePath, 'utf-8')
      )
    );
  } catch (ex) {
    if (ex.code === 'ENOENT') {
      return fail(new ConfigurationNotFound('Failed to read configuration file.', { ex }));
    }
    
    throw ex;
  }
};

const configuration = await loadConfiguration();

const port = configuration.unpackOrDefault({ port: 3000 });

await startServer(configuration.port);
```

Here, any errors related to the configuration file missing are caught, propagated and handled explicitly. If `JSON.parse` fails or if the process runs out of memory, an exception will be thrown and *not* handled.

### API Overview

There are two ways to construct a `Result`. A result can either be `Okay` or `Fail`:

```typescript
import { Okay, okay, Fail, fail, Result } from '@yeldirium/result';

const failedResult: Fail<Error> = fail(new Error());
const successfulResult: Okay<number> = okay(5);

// Both are assignable to a Result with the right type parameters.
let result = Result<number, Error>;
result = failedResult;
result = successfulResult;
```

When you get a result from a function, you can check whether it has failed and act appropriately:

```typescript
import { Result } from '@yeldirium/result';

const someResult: Result<number, Error> = calculateStuff();

if (someResult.isFail()) {
  // Propagate the error so that callers can maybe handle it.
  return someResult;
}

console.log(someResult.value);
```

Alternatively you can use `isOkay` to achieve the opposite.

There is a more convenient solution, if you don't need to propagate your errors:

```typescript
import { Result } from '@yeldirium/result';

const someResult: Result<number, Error> = calculateStuff();

const value = someResult.unpackOrDefault(17);

// Or, if you can not handle the possible errors appropriately and instead want to crash your application:
const value = someResult.unpackOrCrash();

// If you want to give more context information before propagating an error, you can optionally supply an error handler.
// This error *must* return a new Error.
const value = someResult.unpackOrCrash(
  (ex) => new ErrorWithMoreContext('Some message', { cause: ex })
);
```

## Running quality assurance

To run quality assurance for this module use [roboter](https://www.npmjs.com/package/roboter):

```shell
$ npx roboter
```

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
      return error(new ConfigurationNotFound('Failed to read configuration file.', { ex }));
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

## Running quality assurance

To run quality assurance for this module use [roboter](https://www.npmjs.com/package/roboter):

```shell
$ npx roboter
```

import { assert } from 'assertthat';
import { defekt, hydrateCustomError, isCustomError } from '../../lib';

suite('hydrateCustomError', (): void => {
  test('creates an error instance from raw data.', async (): Promise<void> => {
    class TokenInvalid extends defekt({ code: 'TokenInvalid' }) {}
    class TokenExpired extends defekt({ code: 'TokenExpired' }) {}

    const rawEx = {
      name: 'TokenInvalid',
      code: 'TokenInvalid',
      message: 'Foo',
      data: { foo: 'bar' },
      cause: {
        name: 'TokenExpired',
        code: 'TokenExpired',
        message: 'Token expired.'
      }
    };

    const ex = hydrateCustomError({
      rawEx,
      potentialErrorConstructors: [ TokenInvalid, TokenExpired ]
    }).unwrapOrThrow();

    assert.that(isCustomError(ex, TokenInvalid)).is.true();
    assert.that(ex.cause).is.equalTo(rawEx.cause);
  });

  test('fails to hydrate an error that is missing a name.', async (): Promise<void> => {
    const rawEx = {
      code: 'TokenInvalid',
      message: 'Foo'
    };

    const hydrateResult = hydrateCustomError({
      rawEx,
      potentialErrorConstructors: []
    });

    assert.that(hydrateResult).is.anErrorWithMessage('The given error is missing a name.');
  });

  test('fails to hydrate an error that is missing a code.', async (): Promise<void> => {
    const rawEx = {
      name: 'TokenInvalid',
      message: 'Foo'
    };

    const hydrateResult = hydrateCustomError({
      rawEx,
      potentialErrorConstructors: []
    });

    assert.that(hydrateResult).is.anErrorWithMessage('The given error is missing a code.');
  });

  test('fails to hydrate an error that is missing a message.', async (): Promise<void> => {
    const rawEx = {
      name: 'TokenInvalid',
      code: 'TokenInvalid'
    };

    const hydrateResult = hydrateCustomError({
      rawEx,
      potentialErrorConstructors: []
    });

    assert.that(hydrateResult).is.anErrorWithMessage('The given error is missing a message.');
  });

  test('fails to hydrate an error for which no appropriate error constructer is given.', async (): Promise<void> => {
    class TokenExpired extends defekt({ code: 'TokenExpired' }) {}

    const rawEx = {
      name: 'TokenInvalid',
      code: 'TokenInvalid',
      message: 'Foo'
    };

    const hydrateResult = hydrateCustomError({
      rawEx,
      potentialErrorConstructors: [ TokenExpired ]
    });

    assert.that(hydrateResult).is.anErrorWithMessage('Could not find an appropriate ErrorConstructor to hydrate the given error.');
  });

  test('can hydrate serialized and deserialized errors.', async (): Promise<void> => {
    class TokenInvalid extends defekt({ code: 'TokenInvalid' }) {}

    const ex = new TokenInvalid();
    const hydratedEx = hydrateCustomError({
      rawEx: JSON.parse(JSON.stringify(ex)),
      potentialErrorConstructors: [ TokenInvalid ]
    }).unwrapOrThrow();

    assert.that(isCustomError(hydratedEx, TokenInvalid)).is.true();
  });
});

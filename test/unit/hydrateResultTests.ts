import { assert } from 'assertthat';
import { CustomError, defekt, error, hydrateResult, Result, value } from '../../lib';

suite('hydrateResult', (): void => {
  test('creates a Result instance from raw data containing a value.', async (): Promise<void> => {
    const rawResult = {
      value: 'foo'
    };

    const result = hydrateResult({ rawResult });

    assert.that(result).is.aValue();
    assert.that(result.unwrapOrThrow()).is.aValue();
    assert.that(result).is.equalTo(value(value('foo') as Result<string, any>));
  });

  test('creates a Result instance from raw data containing an error.', async (): Promise<void> => {
    const ex = new Error('Foo');
    const rawResult = {
      error: ex
    };

    const result = hydrateResult({ rawResult });

    assert.that(result).is.aValue();
    assert.that(result.unwrapOrThrow()).is.anErrorWithMessage('Foo');
    assert.that(result).is.equalTo(value(error(ex) as Result<any, Error>));
  });

  test('returns an error if the raw data contains neither a value nor an error.', async (): Promise<void> => {
    const rawResult = {};

    const result = hydrateResult({ rawResult } as any);

    assert.that(result).is.anErrorWithMessage('Hydrating result failed.');
  });

  test('hydrates the contained error if given potential error constructors.', async (): Promise<void> => {
    class TokenInvalid extends defekt({ code: 'TokenInvalid' }) {}

    const rawResult = {
      error: {
        name: 'TokenInvalid',
        code: 'TokenInvalid',
        message: 'Foo'
      }
    };

    const hydrateResultResult = hydrateResult({
      rawResult,
      potentialErrorConstructors: [ TokenInvalid ]
    });

    assert.that(hydrateResultResult).is.aValue();
    assert.that(hydrateResultResult.unwrapOrThrow()).is.anErrorWithMessage('Foo');
    assert.that(hydrateResultResult.unwrapOrThrow().unwrapErrorOrThrow().code).is.equalTo('TokenInvalid');
  });

  test('returns an error if the contained error is not hydratable with any of the given potential error constructors.', async (): Promise<void> => {
    class TokenExpired extends defekt({ code: 'TokenExpired' }) {}

    const rawResult = {
      error: {
        name: 'TokenInvalid',
        code: 'TokenInvalid',
        message: 'Foo'
      }
    };

    const hydrateResultResult = hydrateResult({
      rawResult,
      potentialErrorConstructors: [ TokenExpired ]
    });

    assert.that(hydrateResultResult).is.anErrorWithMessage('Hydrating result failed.');
    assert.that((hydrateResultResult.unwrapErrorOrThrow().cause as CustomError).code).is.equalTo('HydratingErrorFailed');
  });
});

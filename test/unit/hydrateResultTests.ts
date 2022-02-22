import { assert } from 'assertthat';
import { error, hydrateResult, Result, value } from '../../lib';

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
});

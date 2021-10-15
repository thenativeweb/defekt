import { assert } from 'assertthat';
import { error, hydrateResult, value } from '../../lib';

suite('hydrateResult', (): void => {
  test('creates a Result instance from raw data containing a value.', async (): Promise<void> => {
    const rawResult = {
      value: 'foo'
    };

    const result = hydrateResult({ rawResult });

    assert.that(result).is.aValue();
    assert.that(result).is.equalTo(value('foo'));
  });

  test('creates a Result instance from raw data containing an error.', async (): Promise<void> => {
    const ex = new Error('Foo');
    const rawResult = {
      error: ex
    };

    const result = hydrateResult({ rawResult });

    assert.that(result).is.anErrorWithMessage('Foo');
    assert.that(result).is.equalTo(error(ex));
  });

  test('creates a Result instance from raw data containing neither a value nor an error.', async (): Promise<void> => {
    const rawResult = {};

    const result = hydrateResult({ rawResult });

    assert.that(result).is.aValue();
    assert.that(result).is.equalTo(value());
  });

  test('ignores any unknown properties in the raw data.', async (): Promise<void> => {
    const rawResult = {
      foo: 'bar',
      bam: 'baz'
    } as any;

    const result = hydrateResult({ rawResult });

    assert.that(result).is.aValue();
    assert.that(result).is.equalTo(value());
  });
});

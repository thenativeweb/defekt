import { assert } from 'assertthat';
import { isResult } from '../../lib/isResult';
import { error, value } from '../../lib/Result';

suite('isResult', (): void => {
  test('returns true for a ResultValue.', async (): Promise<void> => {
    const resultObject = value('foo');

    assert.that(isResult(resultObject)).is.true();
  });

  test('returns true for a ResultError.', async (): Promise<void> => {
    const resultObject = error(new Error('foo'));

    assert.that(isResult(resultObject)).is.true();
  });

  test('returns false for an empty object.', async (): Promise<void> => {
    const resultObject = {};

    assert.that(isResult(resultObject)).is.false();
  });

  test('returns false for a number.', async (): Promise<void> => {
    const resultObject = 5;

    assert.that(isResult(resultObject)).is.false();
  });

  test('returns false for a string.', async (): Promise<void> => {
    const resultObject = 'foo';

    assert.that(isResult(resultObject)).is.false();
  });

  test('returns false for a boolean.', async (): Promise<void> => {
    const resultObject = false;

    assert.that(isResult(resultObject)).is.false();
  });

  test('returns false for a symbol.', async (): Promise<void> => {
    const resultObject = Symbol('foo');

    assert.that(isResult(resultObject)).is.false();
  });

  test('returns false for an array.', async (): Promise<void> => {
    const resultObject = [ 2, 4 ];

    assert.that(isResult(resultObject)).is.false();
  });

  test('returns false for a function.', async (): Promise<void> => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const resultObject = (): number => 5;

    assert.that(isResult(resultObject)).is.false();
  });

  test('returns false for null.', async (): Promise<void> => {
    const resultObject = null;

    assert.that(isResult(resultObject)).is.false();
  });

  test('returns false for an object that has a value property but none of the functions.', async (): Promise<void> => {
    const resultObject = { value: 'foo' };

    assert.that(isResult(resultObject)).is.false();
  });

  test('returns false for an object that has an error property but none of the functions.', async (): Promise<void> => {
    const resultObject = { error: new Error('foo') };

    assert.that(isResult(resultObject)).is.false();
  });

  for (const functionName of [ 'hasError', 'hasValue', 'unwrapOrThrow', 'unwrapOrElse', 'unwrapOrDefault' ]) {
    test(`returns false for an object that is missing the function ${functionName}.`, async (): Promise<void> => {
      const resultObject = value('foo');

      Reflect.deleteProperty(resultObject, functionName);

      assert.that(isResult(resultObject)).is.false();
    });

    test(`returns false for an objects whose ${functionName} property is not a function.`, async (): Promise<void> => {
      const resultObject = value('foo');

      (resultObject as any)[functionName] = 5;

      assert.that(isResult(resultObject)).is.false();
    });
  }

  test('returns false for a result with additional properties.', async (): Promise<void> => {
    const resultObject = value('foo');

    (resultObject as any).foo = 'bar';

    assert.that(isResult(resultObject)).is.false();
  });
});

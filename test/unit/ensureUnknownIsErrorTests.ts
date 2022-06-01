import { assert } from 'assertthat';
import { defekt, ensureUnknownIsError } from '../../lib';

suite('ensureUnknownIsError', (): void => {
  test('returns a given Error as-is.', async (): Promise<void> => {
    const originalError = new Error('Foo.');

    const resultingError = ensureUnknownIsError({ error: originalError });

    assert.that(resultingError).is.instanceOf(Error);
    assert.that(resultingError).is.identicalTo(originalError);
  });

  test('returns a given custom error that is subclassed from Erorr as-is.', async (): Promise<void> => {
    class CustomError extends defekt({ code: 'CustomError' }) {}
    const originalError = new CustomError('Foo.');

    const resultingError = ensureUnknownIsError({ error: originalError });

    assert.that(resultingError).is.instanceOf(Error);
    assert.that(resultingError).is.identicalTo(originalError);
  });

  test('wraps a literal in an Error and uses the JSON-serialized original error as the error message.', async (): Promise<void> => {
    const originalError = { foo: 'bar' };

    const resultingError = ensureUnknownIsError({ error: originalError });

    assert.that(resultingError).is.instanceOf(Error);
    assert.that(resultingError).is.equalTo(new Error('{"foo":"bar"}'));
  });

  test(`wraps a literal in an Error and attaches the original to the error's data property if it can not be JSON-serialized.`, async (): Promise<void> => {
    const originalError: any = {};
    const mutuallyRecursive: any = {};

    originalError.mutuallyRecursive = mutuallyRecursive;
    mutuallyRecursive.originalError = originalError;

    const resultingError = ensureUnknownIsError({ error: originalError });

    const expectedError = new Error('See the data property for the original error.') as Error & { data: any };

    expectedError.data = originalError;

    assert.that(resultingError).is.instanceOf(Error);
    assert.that(resultingError).is.equalTo(expectedError);
  });
});

import { assert } from 'assertthat';
import { defekt, isError } from '../../lib';

suite('isError', (): void => {
  test('returns true, if the parameter is an Error.', async (): Promise<void> => {
    const ex = new Error();

    const result = isError(ex);

    assert.that(result).is.true();
  });

  test('returns true, if the parameter is a CustomError.', async (): Promise<void> => {
    const errors = defekt({
      InvalidOperation: {}
    });
    const ex = new errors.InvalidOperation();

    const result = isError(ex);

    assert.that(result).is.true();
  });

  test('returns false, if the parameter is not an object.', async (): Promise<void> => {
    const ex = 5;

    const result = isError(ex);

    assert.that(result).is.false();
  });

  test('returns false, if the parameter is null.', async (): Promise<void> => {
    const ex = null;

    const result = isError(ex);

    assert.that(result).is.false();
  });

  test('returns false, if the parameter is not an Error.', async (): Promise<void> => {
    const ex = { foo: 'bar' };

    const result = isError(ex);

    assert.that(result).is.false();
  });

  test('works with unknown type binding in catch clause.', async (): Promise<void> => {
    try {
      throw new Error('Something went wrong.');
    } catch (ex: unknown) {
      if (isError(ex)) {
        assert.that(ex.message).is.equalTo('Something went wrong.');
      } else {
        throw new Error('This should not happen.');
      }
    }
  });
});

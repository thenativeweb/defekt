import { assert } from 'assertthat';
import { defekt, isCustomError } from '../../lib';

suite('isCustomError', (): void => {
  test('returns true, if the parameter is a CustomError.', async (): Promise<void> => {
    const errors = defekt({
      InvalidOperation: {}
    });
    const ex = new errors.InvalidOperation();

    const result = isCustomError(ex);

    assert.that(result).is.true();
  });

  test('returns false, if the parameter is not an object.', async (): Promise<void> => {
    const ex = 5;

    const result = isCustomError(ex);

    assert.that(result).is.false();
  });

  test('returns false, if the parameter is null.', async (): Promise<void> => {
    const ex = null;

    const result = isCustomError(ex);

    assert.that(result).is.false();
  });

  test('returns false, if the parameter is not a CustomError.', async (): Promise<void> => {
    const ex = { foo: 'bar' };

    const result = isCustomError(ex);

    assert.that(result).is.false();
  });

  test('returns false, if a necessary property exists but has the wrong type.', async (): Promise<void> => {
    const ex = {
      name: 'InvalidOperation',
      code: 5,
      message: ''
    };

    const result = isCustomError(ex);

    assert.that(result).is.false();
  });

  test('returns false, if the parameter is a normal Error.', async (): Promise<void> => {
    const ex = new Error('Something went wrong.');

    const result = isCustomError(ex);

    assert.that(result).is.false();
  });

  test('works with unknown type binding in catch clause.', async (): Promise<void> => {
    const errors = defekt({
      InvalidOperation: {}
    });

    try {
      throw new errors.InvalidOperation();
    } catch (ex: unknown) {
      if (isCustomError(ex)) {
        assert.that(ex.code).is.equalTo(errors.InvalidOperation.code);
      } else {
        throw new Error('This should not happen.');
      }
    }
  });
});

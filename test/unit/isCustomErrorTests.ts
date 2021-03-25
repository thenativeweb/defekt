import { assert } from 'assertthat';
import { defekt, isCustomError } from '../../lib';

suite('isCustomError', (): void => {
  test('returns true, if the parameter is a CustomError.', async (): Promise<void> => {
    class TokenInvalid extends defekt({ code: 'TokenInvalid' }) {}

    const ex = new TokenInvalid();

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
      name: 5,
      message: ''
    };

    const result = isCustomError(ex);

    assert.that(result).is.false();
  });

  test('works with unknown type binding in catch clause.', async (): Promise<void> => {
    class TokenInvalid extends defekt({ code: 'TokenInvalid' }) {}

    try {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new TokenInvalid();
    } catch (ex: unknown) {
      if (isCustomError(ex)) {
        assert.that(ex.code).is.equalTo(TokenInvalid.code);
      } else {
        throw new Error('This should not happen.');
      }
    }
  });

  test(`acts as a type guard for 'CustomError'.`, async (): Promise<void> => {
    class TokenInvalid extends defekt({ code: 'TokenInvalid' }) {}

    const ex: TokenInvalid = new TokenInvalid();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function,unicorn/consistent-function-scoping
    const assertIsError = function (ex2: Error): void {};

    if (isCustomError(ex)) {
      assertIsError(ex);
    }
  });

  test('acts as a type guard for specific custom errors.', async (): Promise<void> => {
    class TokenInvalid extends defekt({ code: 'TokenInvalid' }) {}
    class TokenExpired extends defekt({ code: 'TokenExpired' }) {}

    const ex: TokenExpired | TokenInvalid = new TokenInvalid();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
    const assertIsCustomError = function (ex2: TokenInvalid): void {};

    if (isCustomError(ex, TokenInvalid)) {
      assertIsCustomError(ex);
    }
  });
});

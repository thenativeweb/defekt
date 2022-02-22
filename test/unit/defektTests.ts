import { assert } from 'assertthat';
import { formatErrorMessage } from '../../lib/formatErrorMessage';
import { CustomError, defekt } from '../../lib';

suite('defekt', (): void => {
  test('creates a custom error with a default message.', async (): Promise<void> => {
    class TokenInvalid extends defekt({ code: 'TokenInvalid' }) {}

    const ex = new TokenInvalid();

    assert.that(ex.message).is.equalTo(formatErrorMessage({ code: 'TokenInvalid' }));
  });

  test('creates a custom error with a custom default message.', async (): Promise<void> => {
    const defaultMessage = 'The token was invalid.';

    class TokenInvalid extends defekt({ code: 'TokenInvalid', defaultMessage }) {}

    const ex = new TokenInvalid();

    assert.that(ex.message).is.equalTo(defaultMessage);
  });

  test('creates a custom error with a correct code.', async (): Promise<void> => {
    class TokenInvalid extends defekt({ code: 'TokenInvalid' }) {}

    const ex = new TokenInvalid();

    assert.that(ex.code).is.equalTo('TokenInvalid');
  });

  test('creates a custom error with a correct code, even if the class name does not match.', async (): Promise<void> => {
    class TokenInvalid extends defekt({ code: 'SomethingCompletelyUnrelated' }) {}

    const ex: TokenInvalid = new TokenInvalid();

    assert.that(ex.code).is.equalTo('SomethingCompletelyUnrelated');
    assert.that(TokenInvalid.code).is.equalTo('SomethingCompletelyUnrelated');
  });

  test('creates a custom error with an optional custom message.', async (): Promise<void> => {
    class TokenInvalid extends defekt({ code: 'TokenInvalid' }) {}

    const ex = new TokenInvalid('Token is not valid JSON');

    assert.that(ex.message).is.equalTo('Token is not valid JSON');
  });

  test('creates a custom error with an optional custom message in the parameter object.', async (): Promise<void> => {
    class TokenInvalid extends defekt({ code: 'TokenInvalid' }) {}

    const ex = new TokenInvalid({ message: 'Token is not valid JSON' });

    assert.that(ex.message).is.equalTo('Token is not valid JSON');
  });

  test('creates a custom error with an optional cause.', async (): Promise<void> => {
    class TokenInvalid extends defekt({ code: 'TokenInvalid' }) {}

    const cause: unknown = {};
    const ex = new TokenInvalid({ cause });

    assert.that(ex.cause).is.equalTo(cause);
  });

  test('creates a custom error with optional additional data.', async (): Promise<void> => {
    class TokenInvalid extends defekt({ code: 'TokenInvalid' }) {}

    const data = { foo: 'bar' };
    const ex = new TokenInvalid({ data });

    assert.that(ex.data).is.equalTo(data);
  });

  test(`creates a custom errors that fulfils the 'CustomError' interface.`, async (): Promise<void> => {
    class TokenInvalid extends defekt({ code: 'TokenInvalid' }) {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function,unicorn/consistent-function-scoping
    const assertIsCustomError = function (ex: CustomError): void {};

    const ex = new TokenInvalid();

    assertIsCustomError(ex);
  });

  test(`creates a custom error that fulfils the 'Error' interface.`, async (): Promise<void> => {
    class TokenInvalid extends defekt({ code: 'TokenInvalid' }) {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function,unicorn/consistent-function-scoping
    const assertIsError = function (ex: Error): void {};

    const ex = new TokenInvalid();

    assertIsError(ex);
  });

  test(`creates a custom error that contains a stack trace.`, async (): Promise<void> => {
    class TokenInvalid extends defekt({ code: 'TokenInvalid' }) {}

    const ex = new TokenInvalid();

    assert.that(ex.stack).is.not.undefined();
  });

  test(`creates custom errors that can be used in exhaustive switch/case statements.`, async (): Promise<void> => {
    class TokenInvalid extends defekt({ code: 'TokenInvalid' }) {}
    class TokenExpired extends defekt({ code: 'TokenExpired' }) {}

    const ex: TokenInvalid | TokenExpired = {} as any;

    switch (ex.code) {
      case TokenExpired.code: {
        break;
      }
      case TokenInvalid.code: {
        break;
      }
      default: {
        // This would not compile if the above cases were not exhaustive.
        return {} as never;
      }
    }
  });

  test('creates a custom error that serializes to JSON in a meaningful way.', async (): Promise<void> => {
    class TokenInvalid extends defekt({ code: 'TokenInvalid' }) {}

    const cause = new TokenInvalid();
    const ex = new TokenInvalid({ message: 'Foo', data: { foo: 'bar' }, cause });

    assert.that(JSON.stringify(ex)).is.equalTo(JSON.stringify({
      name: 'TokenInvalid',
      message: formatErrorMessage({ code: 'TokenInvalid' }),
      code: 'TokenInvalid',
      stack: ex.stack,
      data: { foo: 'bar' },
      cause: JSON.stringify(cause)
    }));
  });

  test('creates a custom error that serializes to JSON and omits cause if it is not serializable.', async (): Promise<void> => {
    class TokenInvalid extends defekt({ code: 'TokenInvalid' }) {}

    const objectA: any = {};
    const objectB: any = { objectA };

    objectA.objectB = objectB;
    const ex = new TokenInvalid({ message: 'Foo', cause: objectA });

    assert.that(JSON.stringify(ex)).is.equalTo(JSON.stringify({
      name: 'TokenInvalid',
      message: formatErrorMessage({ code: 'TokenInvalid' }),
      code: 'TokenInvalid',
      stack: ex.stack
    }));
  });

  test('creates a custom error that serializes to JSON and omits data if it is not serializable.', async (): Promise<void> => {
    class TokenInvalid extends defekt({ code: 'TokenInvalid' }) {}

    const objectA: any = {};
    const objectB: any = { objectA };

    objectA.objectB = objectB;
    const ex = new TokenInvalid({ message: 'Foo', data: objectA });

    assert.that(JSON.stringify(ex)).is.equalTo(JSON.stringify({
      name: 'TokenInvalid',
      message: formatErrorMessage({ code: 'TokenInvalid' }),
      code: 'TokenInvalid',
      stack: ex.stack
    }));
  });
});

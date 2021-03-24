import { assert } from 'assertthat';
import { formatErrorMessage } from '../../lib/formatErrorMessage';
import { CustomError, defekt } from '../../lib';

suite('defekt', (): void => {
  test('creates a custom error with a default message.', async (): Promise<void> => {
    class TokenInvalid extends defekt('TokenInvalid') {}

    const ex = new TokenInvalid();

    assert.that(ex.message).is.equalTo(formatErrorMessage({ errorName: 'TokenInvalid' }));
  });

  test('creates a custom error with a correct name.', async (): Promise<void> => {
    class TokenInvalid extends defekt('TokenInvalid') {}

    const ex = new TokenInvalid();

    assert.that(ex.name).is.equalTo('TokenInvalid');
  });

  test('creates a custom error with an optional custom message.', async (): Promise<void> => {
    class TokenInvalid extends defekt('TokenInvalid') {}

    const ex = new TokenInvalid('Token is not valid JSON');

    assert.that(ex.message).is.equalTo('Token is not valid JSON');
  });

  test('creates a custom error with an optional custom message in the parameter object.', async (): Promise<void> => {
    class TokenInvalid extends defekt('TokenInvalid') {}

    const ex = new TokenInvalid({ message: 'Token is not valid JSON' });

    assert.that(ex.message).is.equalTo('Token is not valid JSON');
  });

  test('creates a custom error with an optional cause.', async (): Promise<void> => {
    class TokenInvalid extends defekt('TokenInvalid') {}

    const cause: unknown = {};
    const ex = new TokenInvalid({ cause });

    assert.that(ex.cause).is.equalTo(cause);
  });

  test('creates a custom error with optional additional data.', async (): Promise<void> => {
    class TokenInvalid extends defekt('TokenInvalid') {}

    const data = { foo: 'bar' };
    const ex = new TokenInvalid({ data });

    assert.that(ex.data).is.equalTo(data);
  });

  test(`creates a custom errors that fulfils the 'CustomError' interface.`, async (): Promise<void> => {
    class TokenInvalid extends defekt('TokenInvalid') {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function,unicorn/consistent-function-scoping
    const assertIsCustomError = function (ex: CustomError): void {};

    const ex = new TokenInvalid();

    assertIsCustomError(ex);
  });

  test(`creates a custom error that fulfils the 'Error' interface.`, async (): Promise<void> => {
    class TokenInvalid extends defekt('TokenInvalid') {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function,unicorn/consistent-function-scoping
    const assertIsError = function (ex: Error): void {};

    const ex = new TokenInvalid();

    assertIsError(ex);
  });

  test(`creates a custom error that contains a stack trace.`, async (): Promise<void> => {
    class TokenInvalid extends defekt('TokenInvalid') {}

    const ex = new TokenInvalid();

    assert.that(ex.stack).is.not.undefined();
  });

  test(`creates custom errors that can be used in exhaustive switch/case statements.`, async (): Promise<void> => {
    class TokenInvalid extends defekt('TokenInvalid') {}
    class TokenExpired extends defekt('TokenExpired') {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ex: TokenInvalid | TokenExpired = {} as any;

    switch (ex.name) {
      case 'TokenExpired': {
        break;
      }
      case 'TokenInvalid': {
        break;
      }
      default: {
        // This would not compile if the above cases were not exhaustive.
        return {} as never;
      }
    }
  });
});

import { assert } from 'assertthat';
import { defekt } from 'lib';
import { error, Result, value } from '../../lib/Result';

suite('Result', (): void => {
  suite('error', (): void => {
    test('constructs the ResultError type.', async (): Promise<void> => {
      // eslint-disable-next-line unicorn/error-message
      const err = new Error();

      const result = error(err);

      assert.that(result as object).is.atLeast({
        error: err
      });
    });

    test('works with custom error types.', async (): Promise<void> => {
      class CustomError extends Error {}
      const err = new CustomError();

      const result = error(err);

      assert.that(result as object).is.atLeast({
        error: err
      });
    });
  });

  suite('value', (): void => {
    test('constructs the ResultValue type.', async (): Promise<void> => {
      const val = { foo: 'bar' };

      const result = value(val);

      assert.that(result as object).is.atLeast({
        value: val
      });
    });

    test('may be used without a parameter.', async (): Promise<void> => {
      const result = value();

      assert.that(result as object).is.atLeast({
        value: undefined
      });
    });
  });

  suite('hasError', (): void => {
    test(`returns true for something constructed with 'error()'.`, async (): Promise<void> => {
      // eslint-disable-next-line unicorn/error-message
      const result = error(new Error());

      const resultHasError = result.hasError();

      assert.that(resultHasError).is.true();
    });

    test(`returns false for something constructed with 'value()'.`, async (): Promise<void> => {
      const result = value({ foo: 'bar' });

      const resultHasError = result.hasError();

      assert.that(resultHasError).is.false();
    });
  });

  suite('hasValue', (): void => {
    test(`returns true for something constructed with 'value()'.`, async (): Promise<void> => {
      const result = value({ foo: 'bar' });

      const resultHasValue = result.hasValue();

      assert.that(resultHasValue).is.true();
    });

    test(`returns false for something constructed with 'error()'.`, async (): Promise<void> => {
      // eslint-disable-next-line unicorn/error-message
      const result = error(new Error());

      const resultHasValue = result.hasValue();

      assert.that(resultHasValue).is.false();
    });
  });

  suite('unwrapOrThrow', (): void => {
    test('unwraps the result if it does not have an error.', async (): Promise<void> => {
      const val = { foo: 'bar' };

      const result = value(val);

      const unwrappedResult = result.unwrapOrThrow();

      assert.that(unwrappedResult).is.equalTo(val);
    });

    test('throws the contained error if the result has an error.', async (): Promise<void> => {
      // eslint-disable-next-line unicorn/error-message
      const err = new Error();

      const result = error(err);

      assert.that((): void => {
        result.unwrapOrThrow();
      }).is.throwing((unwrappedError): boolean => {
        assert.that(unwrappedError).is.equalTo(err);

        return true;
      });
    });

    test('uses the given error transformers and throws the new error.', async (): Promise<void> => {
      // eslint-disable-next-line unicorn/error-message
      const err = new Error();
      const errSecond = new Error('Second error.');

      const result = error(err);

      assert.that((): void => {
        result.unwrapOrThrow((): Error => errSecond);
      }).is.throwing((unwrappedError): boolean => {
        assert.that(unwrappedError).is.equalTo(errSecond);

        return true;
      });
    });
  });

  suite('unwrapOrElse', (): void => {
    test('unwraps the result if it does not have an error.', async (): Promise<void> => {
      const val = { foo: 'bar' };
      // eslint-disable-next-line unicorn/consistent-function-scoping
      const errorHandler = (): { foo: string } => ({ foo: 'not-bar' });

      const result = value(val);

      const unwrappedResult = result.unwrapOrElse(errorHandler);

      assert.that(unwrappedResult).is.equalTo(val);
    });

    test('calls the error handler and returns its return value if the result has an error.', async (): Promise<void> => {
      // eslint-disable-next-line unicorn/error-message
      const err = new Error();
      const val = { foo: 'bar' };
      const errorHandler = (): { foo: string } => val;

      const result = error(err);

      const unwrappedResult = result.unwrapOrElse(errorHandler);

      assert.that(unwrappedResult).is.equalTo(val);
    });
  });

  suite('unwrapOrDefault', (): void => {
    test('unwraps the result if it does not have an error.', async (): Promise<void> => {
      const val = { foo: 'bar' };
      const defaultValue = { foo: 'not-bar' };

      const result = value(val);

      const unwrappedResult = result.unwrapOrDefault(defaultValue);

      assert.that(unwrappedResult).is.equalTo(val);
    });

    test('returns the default value if the result has an error.', async (): Promise<void> => {
      // eslint-disable-next-line unicorn/error-message
      const err = new Error();
      const defaultValue = { foo: 'bar' };

      const result = error(err);

      const unwrappedResult = result.unwrapOrDefault(defaultValue);

      assert.that(unwrappedResult).is.equalTo(defaultValue);
    });
  });

  suite('makes sense', (): void => {
    test('a function that returns a Result can reasonably be used and the types make sense.', async (): Promise<void> => {
      class CustomError extends defekt({ code: 'CustomError' }) {}

      // eslint-disable-next-line unicorn/consistent-function-scoping
      const getFirstElement = function <TValue>(array: TValue[]): Result<TValue, CustomError> {
        if (array.length > 0) {
          return value(array[0]);
        }

        return error(new CustomError('Array is empty.'));
      };

      const data: number[] = [];

      const result = getFirstElement(data).unwrapOrDefault(5);

      assert.that(result).is.equalTo(5);

      const otherResult = getFirstElement(data);

      if (otherResult.hasError()) {
        switch (otherResult.error.code) {
          case CustomError.code: {
            // This should be executed.
            break;
          }
          default: {
            throw new Error('Operation invalid.');
          }
        }
      }
    });
    test('Results of the same error type match when the type is narrowed down to an error.', async (): Promise<void> => {
      class CustomError extends Error {
        public someProp = 0;
      }

      // This function compiling is enough for this test to pass.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const someFunction = function (someResult: Result<string, CustomError>): Result<number, CustomError> {
        if (someResult.hasError()) {
          return someResult;
        }

        return error(new CustomError());
      };
    });

    test('Results of the same value type match when the type is narrowed down to a value.', async (): Promise<void> => {
      class CustomError1 extends Error {
        public someProp = 1;
      }
      class CustomError2 extends Error {
        public someOtherProp = 'some string';
      }

      // This function compiling is enough for this test to pass.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const someFunction = function (someResult: Result<string, CustomError1>): Result<string, CustomError2> {
        if (someResult.hasValue()) {
          return someResult;
        }

        return value('');
      };
    });
  });
});

import { assert } from 'assertthat';
import { defekt } from '../../lib';
import { isCustomError } from '../../lib/isCustomError';
import { error, Result, ResultDoesNotContainError, value } from '../../lib/Result';

interface Value {
  foo: string;
}

const getValue = function (): Result<Value, Error> {
  return value({ foo: 'bar' });
};
const getError = function (): Result<Value, Error> {
  // eslint-disable-next-line unicorn/error-message
  return error(new Error());
};

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
      const result = getError();

      const resultHasError = result.hasError();

      assert.that(resultHasError).is.true();
    });

    test(`returns false for something constructed with 'value()'.`, async (): Promise<void> => {
      const result = getValue();

      const resultHasError = result.hasError();

      assert.that(resultHasError).is.false();
    });

    test('extrapolates value type correctly.', async (): Promise<void> => {
      const result = getValue();

      if (result.hasError()) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const containedValue: Value = result.value;
    });
  });

  suite('hasValue', (): void => {
    test(`returns true for something constructed with 'value()'.`, async (): Promise<void> => {
      const result = getValue();

      const resultHasValue = result.hasValue();

      assert.that(resultHasValue).is.true();
    });

    test(`returns false for something constructed with 'error()'.`, async (): Promise<void> => {
      const result = getError();

      const resultHasValue = result.hasValue();

      assert.that(resultHasValue).is.false();
    });

    test('extrapolates error type correctly.', async (): Promise<void> => {
      const result = getError();

      if (result.hasValue()) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const containedError = result.error;
    });
  });

  suite('unwrapOrThrow', (): void => {
    test('unwraps the result with the correct value type if it does not have an error.', async (): Promise<void> => {
      const val = { foo: 'bar' };

      const result = value(val) as Result<Value, Error>;

      const unwrappedResult: Value = result.unwrapOrThrow();

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

      const result = error(err) as Result<Value, Error>;

      const unwrappedResult: Value = result.unwrapOrElse(errorHandler);

      assert.that(unwrappedResult).is.equalTo(val);
    });
  });

  suite('unwrapOrDefault', (): void => {
    test('unwraps the result if it does not have an error.', async (): Promise<void> => {
      const val = { foo: 'bar' };
      const defaultValue = { foo: 'not-bar' };

      const result = value(val) as Result<Value, Error>;

      const unwrappedResult: Value = result.unwrapOrDefault(defaultValue);

      assert.that(unwrappedResult).is.equalTo(val);
    });

    test('returns the default value if the result has an error.', async (): Promise<void> => {
      // eslint-disable-next-line unicorn/error-message
      const err = new Error();
      const defaultValue = { foo: 'bar' };

      const result = error(err) as Result<Value, Error>;

      const unwrappedResult: Value = result.unwrapOrDefault(defaultValue);

      assert.that(unwrappedResult).is.equalTo(defaultValue);
    });

    test('can use an arbitrary type as default.', async (): Promise<void> => {
      // eslint-disable-next-line unicorn/error-message
      const err = new Error();
      const defaultValue = 5;

      const result = error(err) as Result<Value, Error>;

      const unwrappedResult: Value | number = result.unwrapOrDefault(defaultValue);

      assert.that(unwrappedResult).is.equalTo(defaultValue);
      assert.that(unwrappedResult).is.ofType('number');
    });
  });

  suite('unwrapErrorOrThrow', (): void => {
    test('unwraps the error with the correct error type if the result contains an error.', async (): Promise<void> => {
      class CustomError extends defekt({ code: 'CustomError' }) {}

      const err = new CustomError();
      const result = error(err) as Result<Value, CustomError>;

      const containedError: CustomError = result.unwrapErrorOrThrow();

      assert.that(containedError).is.equalTo(err);
    });

    test('throws a ResultDoesNotContainError error if the result does not contain an error.', async (): Promise<void> => {
      class CustomError extends defekt({ code: 'CustomError' }) {}

      const result = value({ foo: 'foo' }) as Result<Value, CustomError>;

      assert.that((): void => {
        result.unwrapErrorOrThrow();
      }).is.throwing((ex: Error): boolean => isCustomError(ex, ResultDoesNotContainError));
    });
  });

  suite('makes sense', (): void => {
    test('a function that returns a Result can reasonably be used and the types make sense.', async (): Promise<void> => {
      class CustomError extends defekt({ code: 'CustomError' }) {}

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
  });
});

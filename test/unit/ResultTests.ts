import { assert } from 'assertthat';
import { fail, okay, Result } from '../../lib/Result';

suite('Result', (): void => {
  suite('fail', (): void => {
    test('constructs the Fail type.', async (): Promise<void> => {
      // eslint-disable-next-line unicorn/error-message
      const ex = new Error();

      const result = fail(ex);

      assert.that(result).is.atLeast({
        isFailed: true,
        error: ex
      });
    });

    test('works with custom error types.', async (): Promise<void> => {
      class CustomError extends Error {}
      const ex = new CustomError();

      const result = fail(ex);

      assert.that(result).is.atLeast({
        isFailed: true,
        error: ex
      });
    });
  });

  suite('okay', (): void => {
    test('constructs the Okay type.', async (): Promise<void> => {
      const value = { foo: 'bar' };

      const result = okay(value);

      assert.that(result).is.atLeast({
        isFailed: false,
        value
      });
    });

    test('may be used without a parameter.', async (): Promise<void> => {
      const result = okay();

      assert.that(result).is.atLeast({
        isFailed: false,
        value: undefined
      });
    });
  });

  suite('isFail', (): void => {
    test(`returns true for something constructed with 'fail()'.`, async (): Promise<void> => {
      // eslint-disable-next-line unicorn/error-message
      const result = fail(new Error());

      const isExFailed = result.isFail();

      assert.that(isExFailed).is.true();
    });

    test(`returns false for something constructed with 'okay()'.`, async (): Promise<void> => {
      const result = okay({ foo: 'bar' });

      const isExFailed = result.isFail();

      assert.that(isExFailed).is.false();
    });
  });

  suite('isOkay', (): void => {
    test(`returns true for something constructed with 'okay()'.`, async (): Promise<void> => {
      const result = okay({ foo: 'bar' });

      const isExFailed = result.isOkay();

      assert.that(isExFailed).is.true();
    });

    test(`returns false for something constructed with 'fail()'.`, async (): Promise<void> => {
      // eslint-disable-next-line unicorn/error-message
      const result = fail(new Error());

      const isExFailed = result.isOkay();

      assert.that(isExFailed).is.false();
    });
  });

  suite('unpackOrCrash', (): void => {
    test('unpacks the result if it is not failed.', async (): Promise<void> => {
      const value = { foo: 'bar' };

      const result = okay(value);

      const unpackedResult = result.unpackOrCrash();

      assert.that(unpackedResult).is.equalTo(value);
    });

    test('throws the contained error if the result is failed.', async (): Promise<void> => {
      // eslint-disable-next-line unicorn/error-message
      const ex = new Error();

      const result = fail(ex);

      assert.that((): void => {
        result.unpackOrCrash();
      }).is.throwing((unpackedEx): boolean => {
        assert.that(unpackedEx).is.equalTo(ex);

        return true;
      });
    });

    test('calls the error handler and throws the returned error if the result is failed and an error handler is given.', async (): Promise<void> => {
      const ex = new Error('Old error');

      const result = fail(ex);

      assert.that((): void => {
        result.unpackOrCrash(
          (): Error => new Error('New error')
        );
      }).is.throwing((unpackedEx): boolean => {
        assert.that(unpackedEx.message).is.equalTo('New error');

        return true;
      });
    });
  });

  suite('unpackOrDefault', (): void => {
    test('unpacks the result if it is not failed.', async (): Promise<void> => {
      const value = { foo: 'bar' };
      const defaultValue = { foo: 'not-bar' };

      const result = okay(value);

      const unpackedResult = result.unpackOrDefault(defaultValue);

      assert.that(unpackedResult).is.equalTo(value);
    });

    test('returns the default value if the result is failed.', async (): Promise<void> => {
      // eslint-disable-next-line unicorn/error-message
      const ex = new Error();
      const defaultValue = { foo: 'bar' };

      const result = fail(ex);

      const unpackedResult = result.unpackOrDefault(defaultValue);

      assert.that(unpackedResult).is.equalTo(defaultValue);
    });
  });

  suite('makes sense', (): void => {
    test('a function that returns a Result can reasonably be used and the types make sense.', async (): Promise<void> => {
      // eslint-disable-next-line unicorn/consistent-function-scoping
      const getFirstElement = function <TValue>(array: TValue[]): Result<TValue, Error> {
        if (array.length > 0) {
          return okay(array[0]);
        }

        return fail(new Error('Array is empty.'));
      };

      const data: number[] = [];

      const result = getFirstElement(data).unpackOrDefault(5);

      assert.that(result).is.equalTo(5);
    });
  });
});

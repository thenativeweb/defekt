import { assert } from 'assertthat';
import { defekt } from '../../lib/defekt';
import { types } from 'util';

suite('defekt', (): void => {
  suite('errors', (): void => {
    test('contains the specified errors.', async (): Promise<void> => {
      const errors = defekt({ InvalidOperation: {}, ArgumentNull: {}});

      assert.that(errors.InvalidOperation).is.ofType('function');
      assert.that(errors.ArgumentNull).is.ofType('function');
    });

    suite('CustomError', (): void => {
      test('is an error.', async (): Promise<void> => {
        const errors = defekt({ InvalidOperation: {}, ArgumentNull: {}});
        const error = new errors.InvalidOperation();

        assert.that(error).is.instanceOf(Error);
      });

      test('is recognized by util.types.isNativeError.', async (): Promise<void> => {
        const errors = defekt({ InvalidOperation: {}, ArgumentNull: {}});
        const error = new errors.InvalidOperation();

        assert.that(types.isNativeError(error)).is.true();
      });

      suite('name', (): void => {
        test('contains the given name.', async (): Promise<void> => {
          const errors = defekt({ InvalidOperation: {}, ArgumentNull: {}});
          const error = new errors.InvalidOperation();

          assert.that(error.name).is.equalTo('InvalidOperation');
        });
      });

      suite('code', (): void => {
        test('is the E-prefixed upper-cased name by default.', async (): Promise<void> => {
          const errors = defekt({ InvalidOperation: {}, ArgumentNull: {}});
          const error = new errors.InvalidOperation();

          assert.that(error.code).is.equalTo('EINVALIDOPERATION');
        });

        test('is set to the given value.', async (): Promise<void> => {
          const errors = defekt({
            InvalidOperation: { code: 'INVOP' },
            ArgumentNull: {}
          });
          const error = new errors.InvalidOperation();

          assert.that(error.code).is.equalTo('INVOP');
        });
      });

      suite('message', (): void => {
        test('contains the human readable error name if no message was given.', async (): Promise<void> => {
          const errors = defekt({ InvalidOperation: {}, ArgumentNull: {}});
          const error = new errors.InvalidOperation();

          assert.that(error.message).is.equalTo('Invalid operation.');
        });

        test('contains the given message.', async (): Promise<void> => {
          const errors = defekt({ InvalidOperation: {}, ArgumentNull: {}});
          const error = new errors.InvalidOperation('foobar');

          assert.that(error.message).is.equalTo('foobar');
        });
      });

      suite('cause', (): void => {
        test('is undefined if no inner error is given.', async (): Promise<void> => {
          const errors = defekt({ InvalidOperation: {}, ArgumentNull: {}});
          const error = new errors.InvalidOperation('foobar');

          assert.that(error.cause).is.undefined();
        });

        test('contains the given inner error.', async (): Promise<void> => {
          const errors = defekt({ InvalidOperation: {}, ArgumentNull: {}});
          const cause = new errors.ArgumentNull();
          const error = new errors.InvalidOperation('foobar', { cause });

          assert.that(error.cause).is.equalTo(cause);
        });
      });

      suite('data', (): void => {
        test('is undefined if no data is given.', async (): Promise<void> => {
          const errors = defekt({ InvalidOperation: {}, ArgumentNull: {}});
          const error = new errors.InvalidOperation('foobar');

          assert.that(error.data).is.undefined();
        });

        test('contains the given data.', async (): Promise<void> => {
          const errors = defekt({ InvalidOperation: {}, ArgumentNull: {}});
          const error = new errors.InvalidOperation('foobar', { data: { foo: 'bar' }});

          assert.that(error.data).is.equalTo({ foo: 'bar' });
        });
      });
    });

    suite('static error code', (): void => {
      test('exposes the error code as static property on constructor.', async (): Promise<void> => {
        const errors = defekt({
          InvalidOperation: {}
        });

        assert.that(errors.InvalidOperation.code).is.equalTo('EINVALIDOPERATION');
      });
    });
  });
});

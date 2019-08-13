'use strict';

const util = require('util');

const assert = require('assertthat');

const defekt = require('../../lib/defekt');

suite('defekt', () => {
  test('is a function.', async () => {
    assert.that(defekt).is.ofType('function');
  });

  test('throws an error if error names are missing.', async () => {
    assert.that(() => {
      defekt();
    }).is.throwing('Error names are missing.');
  });

  test('returns an object.', async () => {
    assert.that(defekt([ 'InvalidOperation' ])).is.ofType('object');
  });

  suite('errors', () => {
    test('contains the specified errors.', async () => {
      const errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);

      assert.that(errors.InvalidOperation).is.ofType('function');
      assert.that(errors.ArgumentNull).is.ofType('function');
    });

    suite('CustomError', () => {
      test('is an error.', async () => {
        const errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
        const error = new errors.InvalidOperation();

        assert.that(error).is.instanceOf(Error);
      });

      test('is recognized by util.isError.', async () => {
        const errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
        const error = new errors.InvalidOperation();

        assert.that(util.isError(error)).is.true();
      });

      suite('name', () => {
        test('contains the given name.', async () => {
          const errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
          const error = new errors.InvalidOperation();

          assert.that(error.name).is.equalTo('InvalidOperation');
        });
      });

      suite('code', () => {
        test('is the E-prefixed upper-cased name by default.', async () => {
          const errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
          const error = new errors.InvalidOperation();

          assert.that(error.code).is.equalTo('EINVALIDOPERATION');
        });

        test('is set to the given value.', async () => {
          const errors = defekt([
            { name: 'InvalidOperation', code: 'INVOP' },
            'ArgumentNull'
          ]);
          const error = new errors.InvalidOperation();

          assert.that(error.code).is.equalTo('INVOP');
        });
      });

      suite('message', () => {
        test('contains the human readable error name if no message was given.', async () => {
          const errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
          const error = new errors.InvalidOperation();

          assert.that(error.message).is.equalTo('Invalid operation.');
        });

        test('contains the given message.', async () => {
          const errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
          const error = new errors.InvalidOperation('foobar');

          assert.that(error.message).is.equalTo('foobar');
        });
      });

      suite('cause', () => {
        test('is undefined if no inner error is given.', async () => {
          const errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
          const error = new errors.InvalidOperation('foobar');

          assert.that(error.cause).is.undefined();
        });

        test('contains the given inner error.', async () => {
          const errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
          const cause = new errors.ArgumentNull();
          const error = new errors.InvalidOperation('foobar', cause);

          assert.that(error.cause).is.equalTo(cause);
        });
      });
    });
  });
});

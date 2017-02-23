'use strict';

const util = require('util');

const assert = require('assertthat');

const defekt = require('../../lib/defekt');

suite('defekt', () => {
  test('is a function.', done => {
    assert.that(defekt).is.ofType('function');
    done();
  });

  test('throws an error if error names are missing.', done => {
    assert.that(() => {
      defekt();
    }).is.throwing('Error names are missing.');
    done();
  });

  test('returns an object.', done => {
    assert.that(defekt([ 'InvalidOperation' ])).is.ofType('object');
    done();
  });

  suite('errors', () => {
    test('contains the specified errors.', done => {
      const errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);

      assert.that(errors.InvalidOperation).is.ofType('function');
      assert.that(errors.ArgumentNull).is.ofType('function');
      done();
    });

    suite('CustomError', () => {
      test('is an error.', done => {
        const errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
        const error = new errors.InvalidOperation();

        assert.that(error).is.instanceOf(Error);
        done();
      });

      test('is recognized by util.isError.', done => {
        const errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
        const error = new errors.InvalidOperation();

        assert.that(util.isError(error)).is.true();
        done();
      });

      suite('name', () => {
        test('contains the given name.', done => {
          const errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
          const error = new errors.InvalidOperation();

          assert.that(error.name).is.equalTo('InvalidOperation');
          done();
        });
      });

      suite('code', () => {
        test('is undefined by default.', done => {
          const errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
          const error = new errors.InvalidOperation();

          assert.that(error.code).is.undefined();
          done();
        });

        test('is set to the given value.', done => {
          const errors = defekt([
            { name: 'InvalidOperation', code: 'INVOP' },
            'ArgumentNull'
          ]);
          const error = new errors.InvalidOperation();

          assert.that(error.code).is.equalTo('INVOP');
          done();
        });
      });

      suite('message', () => {
        test('contains an empty string if no message was given.', done => {
          const errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
          const error = new errors.InvalidOperation();

          assert.that(error.message).is.equalTo('');
          done();
        });

        test('contains the given message.', done => {
          const errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
          const error = new errors.InvalidOperation('foobar');

          assert.that(error.message).is.equalTo('foobar');
          done();
        });
      });

      suite('cause', () => {
        test('is undefined if no inner error is given.', done => {
          const errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
          const error = new errors.InvalidOperation('foobar');

          assert.that(error.cause).is.undefined();
          done();
        });

        test('contains the given inner error.', done => {
          const errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
          const cause = new errors.ArgumentNull();
          const error = new errors.InvalidOperation('foobar', cause);

          assert.that(error.cause).is.equalTo(cause);
          done();
        });
      });
    });
  });
});

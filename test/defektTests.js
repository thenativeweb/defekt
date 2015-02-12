'use strict';

var util = require('util');

var assert = require('assertthat');

var defekt = require('../lib/defekt');

suite('defekt', function () {
  test('is a function.', function (done) {
    assert.that(defekt).is.ofType('function');
    done();
  });

  test('throws an error if error names are missing.', function (done) {
    assert.that(function () {
      defekt();
    }).is.throwing('Error names are missing.');
    done();
  });

  test('returns an object.', function (done) {
    assert.that(defekt([ 'InvalidOperation' ])).is.ofType('object');
    done();
  });

  suite('errors', function () {
    test('contains the specified errors.', function (done) {
      var errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);

      assert.that(errors.InvalidOperation).is.ofType('function');
      assert.that(errors.ArgumentNull).is.ofType('function');
      done();
    });

    suite('CustomError', function () {
      test('is an error.', function (done) {
        var errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
        var error = new errors.InvalidOperation();

        assert.that(error).is.instanceOf(Error);
        done();
      });

      test('is recognized by util.isError.', function (done) {
        var errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
        var error = new errors.InvalidOperation();

        assert.that(util.isError(error)).is.true();
        done();
      });

      suite('name', function () {
        test('contains the given name.', function (done) {
          var errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
          var error = new errors.InvalidOperation();

          assert.that(error.name).is.equalTo('InvalidOperation');
          done();
        });
      });

      suite('message', function () {
        test('contains an empty string if no message was given.', function (done) {
          var errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
          var error = new errors.InvalidOperation();

          assert.that(error.message).is.equalTo('');
          done();
        });

        test('contains the given message.', function (done) {
          var errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
          var error = new errors.InvalidOperation('foobar');

          assert.that(error.message).is.equalTo('foobar');
          done();
        });
      });

      suite('cause', function () {
        test('is undefined if no inner error is given.', function (done) {
          var errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
          var error = new errors.InvalidOperation('foobar');

          assert.that(error.cause).is.undefined();
          done();
        });

        test('contains the given inner error.', function (done) {
          var errors = defekt([ 'InvalidOperation', 'ArgumentNull' ]);
          var cause = new errors.ArgumentNull();
          var error = new errors.InvalidOperation('foobar', cause);

          assert.that(error.cause).is.equalTo(cause);
          done();
        });
      });
    });
  });
});

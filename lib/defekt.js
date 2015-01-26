'use strict';

var util = require('util');

var defekt = function (errorNames) {
  var errors = {};

  if (!errorNames) {
    throw new Error('Error names are missing.');
  }

  errorNames.forEach(function (errorName) {
    var CustomError = function (message, cause) {
      Error.call(this);

      this.name = errorName;
      this.message = message || '';
      this.cause = cause;
    };

    util.inherits(CustomError, Error);

    errors[errorName] = CustomError;
  });

  return errors;
};

module.exports = defekt;

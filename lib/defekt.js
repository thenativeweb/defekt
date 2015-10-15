'use strict';

const util = require('util');

const defekt = function (errorDefinitions) {
  if (!errorDefinitions) {
    throw new Error('Error names are missing.');
  }

  const errors = {};

  errorDefinitions.forEach(errorDefinition => {
    let errorName = errorDefinition;
    let errorCode;

    if (typeof errorDefinition === 'object') {
      errorName = errorDefinition.name;
      errorCode = errorDefinition.code;
    }

    const CustomError = function (message, cause) {
      Error.call(this);

      this.name = errorName;
      this.code = errorCode;
      this.message = message || '';
      this.cause = cause;
    };

    util.inherits(CustomError, Error);

    errors[errorName] = CustomError;
  });

  return errors;
};

module.exports = defekt;

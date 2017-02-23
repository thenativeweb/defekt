'use strict';

const inherits = require('inherits');

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
      Reflect.apply(Error, this, []);

      this.name = errorName;
      this.code = errorCode;
      this.message = message || '';
      this.cause = cause;
    };

    inherits(CustomError, Error);

    errors[errorName] = CustomError;
  });

  return errors;
};

module.exports = defekt;

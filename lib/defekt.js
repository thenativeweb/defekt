'use strict';

const inherits = require('inherits');

const defekt = function (errorDefinitions) {
  if (!errorDefinitions) {
    throw new Error('Error names are missing.');
  }

  const errors = {};

  errorDefinitions.forEach(errorDefinition => {
    let errorName;
    let errorCode;

    switch (typeof errorDefinition) {
      case 'string':
        errorName = errorDefinition;
        errorCode = `E${errorDefinition.toUpperCase()}`;
        break;
      case 'object':
        errorName = errorDefinition.name;
        errorCode = errorDefinition.code;
        break;
      default:
        throw new Error('Invalid error definition.');
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

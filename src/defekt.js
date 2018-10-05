'use strict';

const humanizeString = require('humanize-string');

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

    class CustomError extends Error {
      constructor (message = `${humanizeString(errorName)}.`, cause) {
        super();

        this.name = errorName;
        this.code = errorCode;
        this.message = message;
        this.cause = cause;
      }
    }

    errors[errorName] = CustomError;
  });

  return errors;
};

module.exports = defekt;

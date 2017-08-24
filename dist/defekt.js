'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var inherits = require('inherits');

var defekt = function defekt(errorDefinitions) {
  if (!errorDefinitions) {
    throw new Error('Error names are missing.');
  }

  var errors = {};

  errorDefinitions.forEach(function (errorDefinition) {
    var errorName = void 0;
    var errorCode = void 0;

    switch (typeof errorDefinition === 'undefined' ? 'undefined' : _typeof(errorDefinition)) {
      case 'string':
        errorName = errorDefinition;
        errorCode = 'E' + errorDefinition.toUpperCase();
        break;
      case 'object':
        errorName = errorDefinition.name;
        errorCode = errorDefinition.code;
        break;
      default:
        throw new Error('Invalid error definition.');
    }

    var CustomError = function CustomError(message, cause) {
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
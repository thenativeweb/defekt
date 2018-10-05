'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var humanizeString = require('humanize-string');

var defekt = function defekt(errorDefinitions) {
  if (!errorDefinitions) {
    throw new Error('Error names are missing.');
  }

  var errors = {};

  errorDefinitions.forEach(function (errorDefinition) {
    var errorName = void 0;
    var errorCode = void 0;

    switch (typeof errorDefinition === 'undefined' ? 'undefined' : (0, _typeof3.default)(errorDefinition)) {
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

    var CustomError = function (_Error) {
      (0, _inherits3.default)(CustomError, _Error);

      function CustomError() {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : humanizeString(errorName) + '.';
        var cause = arguments[1];
        (0, _classCallCheck3.default)(this, CustomError);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CustomError.__proto__ || (0, _getPrototypeOf2.default)(CustomError)).call(this));

        _this.name = errorName;
        _this.code = errorCode;
        _this.message = message;
        _this.cause = cause;
        return _this;
      }

      return CustomError;
    }(Error);

    errors[errorName] = CustomError;
  });

  return errors;
};

module.exports = defekt;
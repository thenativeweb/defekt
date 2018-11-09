'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var humanizeString = require('humanize-string');

var defekt = function defekt(errorDefinitions) {
  if (!errorDefinitions) {
    throw new Error('Error names are missing.');
  }

  var errors = {};
  errorDefinitions.forEach(function (errorDefinition) {
    var errorName;
    var errorCode;

    switch ((0, _typeof2.default)(errorDefinition)) {
      case 'string':
        errorName = errorDefinition;
        errorCode = "E".concat(errorDefinition.toUpperCase());
        break;

      case 'object':
        errorName = errorDefinition.name;
        errorCode = errorDefinition.code;
        break;

      default:
        throw new Error('Invalid error definition.');
    }

    var CustomError =
    /*#__PURE__*/
    function (_Error) {
      (0, _inherits2.default)(CustomError, _Error);

      function CustomError() {
        var _this;

        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "".concat(humanizeString(errorName), ".");
        var cause = arguments.length > 1 ? arguments[1] : undefined;
        (0, _classCallCheck2.default)(this, CustomError);
        _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CustomError).call(this));
        _this.name = errorName;
        _this.code = errorCode;
        _this.message = message;
        _this.cause = cause;
        return _this;
      }

      return CustomError;
    }((0, _wrapNativeSuper2.default)(Error));

    errors[errorName] = CustomError;
  });
  return errors;
};

module.exports = defekt;
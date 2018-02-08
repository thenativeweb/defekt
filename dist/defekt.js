'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

    var CustomError = function (_Error) {
      _inherits(CustomError, _Error);

      function CustomError() {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var cause = arguments[1];

        _classCallCheck(this, CustomError);

        var _this = _possibleConstructorReturn(this, (CustomError.__proto__ || Object.getPrototypeOf(CustomError)).call(this));

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
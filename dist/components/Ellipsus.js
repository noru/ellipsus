'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ellipsus = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Styles = {

  wrapper: {
    display: 'inline-block',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    textAlign: 'left'
  },

  content: function content(sec) {
    return {
      transition: 'margin-left ' + sec + 's linear',
      WebkitTransition: 'margin-left ' + sec + 's linear',
      msTransition: 'margin-left ' + sec + 's linear',
      MozTransition: 'margin-left ' + sec + 's linear'
    };
  }

};

var Ellipsus = exports.Ellipsus = function (_PureComponent) {
  (0, _inherits3.default)(Ellipsus, _PureComponent);

  function Ellipsus() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Ellipsus);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Ellipsus.__proto__ || (0, _getPrototypeOf2.default)(Ellipsus)).call.apply(_ref, [this].concat(args))), _this), _this._intervalId = null, _this.state = {
      marginLeft: 0
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Ellipsus, [{
    key: 'startAnimation',
    value: function startAnimation(_ref2) {
      var _this2 = this;

      var interval = _ref2.interval,
          repeat = _ref2.repeat,
          duration = _ref2.duration,
          flyThrough = _ref2.flyThrough;
      var _state = this.state,
          marginLeft = _state.marginLeft,
          visibility = _state.visibility;

      var wrapperWidth = this.wrapper.offsetWidth;
      var contentWidth = this.content.offsetWidth;

      if (repeat === 0) {
        repeat = Infinity;
      }
      var count = 0;
      var trips = repeat * 2;
      var offset = wrapperWidth - contentWidth - 10; // add a little padding

      if (offset < -20) {
        this._intervalId = setInterval(function () {

          marginLeft = marginLeft === 0 ? offset : 0;
          _this2.setState({ marginLeft: marginLeft });

          if (++count >= trips) {
            _this2.stopAnimation();
          }
        }, interval + duration);
      }
    }
  }, {
    key: 'stopAnimation',
    value: function stopAnimation() {
      clearInterval(this._intervalId);
      this._intervalId = null;
      this.setState({ marginLeft: 0 });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.startAnimation(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.stopAnimation();
      this.startAnimation(newProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopAnimation();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          duration = _props.duration,
          flyThrough = _props.flyThrough;
      var _state2 = this.state,
          marginLeft = _state2.marginLeft,
          visibility = _state2.visibility,
          textOverflow = _state2.textOverflow;


      if (children === null || children === undefined) {
        return null;
      }
      if (typeof children === 'number') {
        children = String(children);
      }
      if (typeof children !== 'string') {
        throw Error('Ellipsus: only string/number is allowed as children, got: ' + (typeof children === 'undefined' ? 'undefined' : (0, _typeof3.default)(children)));
      }

      duration = (duration / 1000).toFixed(2) || 2;

      return _react2.default.createElement(
        'span',
        {
          className: 'ellipsus-wrapper ' + (className || ''),
          style: (0, _extends3.default)({}, Styles.wrapper),
          ref: function ref(r) {
            return _this3.wrapper = r;
          }
        },
        _react2.default.createElement(
          'span',
          {
            className: 'ellipsus-content',
            style: (0, _extends3.default)({}, Styles.content(duration), { marginLeft: marginLeft }),
            ref: function ref(r) {
              return _this3.content = r;
            }
          },
          children
        )
      );
    }
  }]);
  return Ellipsus;
}(_react.PureComponent);

Ellipsus.defaultProps = {
  interval: 3000,
  duration: 2000,
  repeat: Infinity
};

Ellipsus.propTypes = {
  interval: _propTypes2.default.number,
  duration: _propTypes2.default.number,
  repeat: _propTypes2.default.number
};

exports.default = Ellipsus;
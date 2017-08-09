'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%'
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

var Ellipsus = function (_PureComponent) {
  (0, _inherits3.default)(Ellipsus, _PureComponent);

  function Ellipsus() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Ellipsus);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Ellipsus.__proto__ || (0, _getPrototypeOf2.default)(Ellipsus)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      marginLeft: 0
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Ellipsus, [{
    key: 'startAnimation',
    value: function startAnimation() {
      var _this2 = this;

      var wrapperWidth = this.wrapper.offsetWidth;
      var contentWidth = this.content.offsetWidth;
      var offset = wrapperWidth - contentWidth - 10; // add a little padding

      var marginLeft = this.state.marginLeft;
      var repeat = this.props.repeat;

      var count = 0;
      var trips = repeat * 2;

      if (offset < -20) {
        this.intervalId = setInterval(function () {

          marginLeft = marginLeft === 0 ? offset : 0;
          _this2.setState({ marginLeft: marginLeft });

          if (++count >= trips) {
            clearInterval(_this2.intervalId);
            _this2.stopAnimation();
          }
        }, this.props.interval);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.startAnimation();
    }
  }, {
    key: 'stopAnimation',
    value: function stopAnimation() {
      clearInterval(this.intervalId);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopAnimation();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      this.stopAnimation();
      this.startAnimation();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          duration = _props.duration;
      var marginLeft = this.state.marginLeft;


      if (typeof children !== 'string') {
        throw Error('Ellipsus: only string is allowed as "children"');
      }

      duration = (duration / 1000).toFixed(2) || 2;

      return _react2.default.createElement(
        'span',
        { className: 'ellipsus-wrapper ' + className, style: Styles.wrapper, ref: function ref(r) {
            return _this3.wrapper = r;
          } },
        _react2.default.createElement(
          'span',
          { className: 'ellipsus-content', style: (0, _extends3.default)({}, Styles.content(duration), { marginLeft: marginLeft }), ref: function ref(r) {
              return _this3.content = r;
            } },
          children
        )
      );
    }
  }]);
  return Ellipsus;
}(_react.PureComponent);

exports.default = Ellipsus;


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
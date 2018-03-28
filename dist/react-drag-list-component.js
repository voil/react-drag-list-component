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

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils');

require('./style.sass');

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DragList = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(DragList, _React$Component);

  function DragList() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, DragList);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DragList.__proto__ || (0, _getPrototypeOf2.default)(DragList)).call(this, props));

    _this.globals = {
      mainClassName: 'drag-list-element'
    };
    _this.state = {
      target: null,
      current: null,
      handler: true,
      propagation: false,
      placeholder: true
    };

    _this.componentWillMount = function () {
      return window.addEventListener("mousemove", function (event) {
        if (!_this.state.current) {
          return false;
        }
        _this.setState({
          current: (0, _extends3.default)({}, _this.state.current, {
            posX: event.clientX,
            posY: event.clientY
          })
        });
      });
    };

    _this.preapre = function () {
      return _this.props.list.map(function (item, index) {
        return _react2.default.createElement(
          'div',
          { key: 'drag-list-' + index,
            className: _this.globals.mainClassName,
            onMouseDown: !_this.state.handler ? _this.handleMouseDown : function () {},
            onMouseUp: _this.handleMouseUp,
            onMouseMove: _this.handleMouseMove,
            'data-index': index
          },
          _this.state.handler ? _react2.default.createElement(
            'div',
            {
              onMouseDown: _this.handleMouseDown,
              className: 'drag-list-handler'
            },
            _react2.default.createElement('span', null),
            _react2.default.createElement('span', null),
            _react2.default.createElement('span', null)
          ) : null,
          _this.props.render(item, index)
        );
      });
    };

    _this.handleMouseMove = function () {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (_this.state.propagation) {
        var parent = event.target.parentElement;
        if (parent.className !== _this.globals.mainClassName) {
          return false;
        }
        _this.startHandleDrag(parent, event);
      }

      if (!_this.state.current) {
        return false;
      }
      _this.setState({ target: event.currentTarget.dataset.index });
    };

    _this.startHandleDrag = function () {
      var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var node = _this.state.handler ? (0, _utils.nodeToString)(parent).replace('<div class="drag-list-handler"><span></span><span></span><span></span></div>', '') : (0, _utils.nodeToString)(event.target);

      _this.setState({
        current: {
          index: _this.state.handler ? parent.dataset.index : event.currentTarget.dataset.index,
          element: _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: node } })
        },
        propagation: false
      });
    };

    _this.handleMouseDown = function () {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _this.setState({ propagation: true });
    };

    _this.handleMouseUp = function () {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!_this.state.current) {
        _this.clear();
        return false;
      }
      var index = event.currentTarget.dataset.index ? event.currentTarget.dataset.index : _this.state.target;
      if (_this.state.current.index === index || !index || !_this.state.current.index) {
        _this.clear();
        return false;
      }
      _this.props.update(_this.props.list[_this.state.current.index], _this.state.current.index, index);
      _this.setState({ current: null, target: null, propagation: false });
    };

    _this.clear = function () {
      return _this.setState({ current: null, target: null, propagation: false });
    };

    _this.render = function () {
      return (0, _template2.default)(_this);
    };

    _this.state.placeholder = _this.props.placeholder === true || _this.props.placeholder === false ? _this.props.placeholder : _this.state.placeholder;
    _this.state.handler = _this.props.handler === true || _this.props.handler === false ? _this.props.handler : _this.state.handler;
    return _this;
  }

  return DragList;
}(_react2.default.Component), _class.propTypes = {
  handler: _propTypes2.default.bool,
  placeholder: _propTypes2.default.bool,
  list: _propTypes2.default.array.isRequired,
  update: _propTypes2.default.func.isRequired,
  render: _propTypes2.default.func.isRequired
}, _temp);
exports.default = DragList;


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

var _class, _temp; /*
                    * =============================================================================
                    * Project: drag-list-component-typescript
                    * Created Date: 2018-03-26, 13:16:18
                    * Author: Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
                    * =============================================================================
                    * Last Modified: 2018-03-26, 14:28:03
                    * Modified By: Przemysław Drzewicki
                    * =============================================================================
                    * Copyright (c) 2018 webonweb
                    * =============================================================================
                    */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils');

require('./style.sass');

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Main class of component.
 * 
 * @export
 * @class DragList
 * @extends {React.Component}
 */
var DragList = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(DragList, _React$Component);

  /**
   * Creates an instance of DragList.
   * 
   * @param {any} [props={}] 
   * @memberof DragList
   */


  /**
   * Main state of component.
   * 
   * @memberof DragList
   */
  function DragList() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, DragList);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DragList.__proto__ || (0, _getPrototypeOf2.default)(DragList)).call(this, props));

    _this.state = {
      current: null,
      target: null,
      placeholder: true

      /**
       * Prototypes for compojent.
       * 
       * @static
       * @memberof DragList
       */
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
            onMouseDown: _this.handleMouseDown,
            onMouseUp: _this.handleMouseUp,
            onMouseMove: _this.handleMouseMove,
            'data-index': index
          },
          _this.props.render(item, index)
        );
      });
    };

    _this.handleMouseMove = function () {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!_this.state.current) {
        return false;
      }
      _this.setState({ target: event.currentTarget.dataset.index });
    };

    _this.handleMouseDown = function () {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _this.setState({
        current: {
          index: event.currentTarget.dataset.index,
          element: _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: (0, _utils.nodeToString)(event.target) } })
        }
      });
    };

    _this.handleMouseUp = function () {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!_this.state.current) {
        return false;
      }
      var index = event.currentTarget.dataset.index ? event.currentTarget.dataset.index : _this.state.target;
      if (_this.state.current.index === index) {
        _this.setState({ current: null, target: null });
        return false;
      }
      _this.props.update(_this.props.list[_this.state.current.index], _this.state.current.index, index);
      _this.setState({ current: null, target: null });
    };

    _this.render = function () {
      return (0, _template2.default)(_this);
    };

    _this.state.placeholder = _this.props.placeholder === true || _this.props.placeholder === false ? _this.props.placeholder : _this.state.placeholder;
    return _this;
  }

  /**
   * Handle component will mount event.
   * 
   * @memberof DragList
   */


  /**
   * Prepare list for handle drag event.
   * 
   * @memberof DragList
   */


  /**
   * Handle mouse over event.
   * 
   * @param {any} [event={}] 
   * @memberof DragList
   */


  /**
   * Handle mouse down event.
   * 
   * @param {any} [event={}] 
   * @memberof DragList
   */


  /**
   * Handle mouse up event.
   * 
   * @param {any} [event={}] 
   * @memberof DragList
   */


  /**
   * Main rendering function.
   *
   * @memberof DragList
   */


  return DragList;
}(_react2.default.Component), _class.propTypes = {
  list: _propTypes2.default.array.isRequired,
  placeholder: _propTypes2.default.bool,
  update: _propTypes2.default.func.isRequired,
  render: _propTypes2.default.func.isRequired }, _temp);
exports.default = DragList;


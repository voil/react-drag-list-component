"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (component) {
  return _react2.default.createElement(
    "div",
    { className: "drag-list" },
    component.preapre(),
    component.state.placeholder ? _react2.default.createElement(
      "div",
      {
        className: "drag-list-current",
        onMouseUp: component.handleMouseUp,
        style: {
          top: component.state.current ? component.state.current.posY : 0,
          left: component.state.current ? component.state.current.posX : 0
        }
      },
      component.state.current ? component.state.current.element : null
    ) : null
  );
};


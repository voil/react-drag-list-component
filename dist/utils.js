"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.nodeToString = nodeToString;
exports.changePositionElement = changePositionElement;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * =============================================================================
 * Project: drag-list-component-typescript
 * Created Date: 2018-03-26, 13:26:18
 * Author: Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
 * =============================================================================
 * Last Modified: 2018-03-26, 14:28:09
 * Modified By: Przemysław Drzewicki
 * =============================================================================
 * Copyright (c) 2018 webonweb
 * =============================================================================
 */

/**
  * Change inner html to html elements.
  * 
  * @export
  * @param {any} [node={}] 
  */
function nodeToString() {
  var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var tmpNode = document.createElement("div");
  tmpNode.appendChild(node.cloneNode(true));
  var str = tmpNode.innerHTML;
  tmpNode = node = null;
  return str;
}

/**
 * Change position element.
 * 
 * @export
 * @param {any} [array=[]] 
 * @param {number} [from=0] 
 * @param {number} [to=0] 
 * @returns 
 */
function changePositionElement() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (to === from) return array;
  var parsed = [];
  var target = array[from];

  parsed = array.filter(function (item, key) {
    return key != from;
  });

  parsed = [].concat((0, _toConsumableArray3.default)(parsed.slice(0, to)), [target], (0, _toConsumableArray3.default)(parsed.slice(to)));
  return parsed;
}


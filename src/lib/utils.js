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
export function nodeToString(node = {}) {
  var tmpNode = document.createElement( "div" );
  tmpNode.appendChild( node.cloneNode( true ) );
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
export function changePositionElement(array = [], from = 0, to = 0) {
  if( to === from ) return array;
  var parsed = [];
  var target = array[from]; 

  parsed = array.filter((item, key) => key != from);

  parsed = [
    ...parsed.slice(0, to),
    target,
    ...parsed.slice(to)
  ]
  return parsed
}
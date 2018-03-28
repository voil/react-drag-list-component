/*
 * =============================================================================
 * Project: react-drag-list-component
 * Created Date: 2018-03-26, 13:21:06
 * Author: Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
 * =============================================================================
 * Last Modified: 2018-03-28, 11:02:14
 * Modified By: Przemysław Drzewicki
 * =============================================================================
 * Copyright (c) 2018 webonweb
 * =============================================================================
 */
import React from 'react';

export default component =>
  (<div className="drag-list">
    {component.preapre()}
    {component.state.placeholder? <div 
      className="drag-list-current"
      onMouseUp={component.handleMouseUp}
      style={{
        top: component.state.current? component.state.current.posY : 0,
        left: component.state.current? component.state.current.posX : 0
      }}
    >{component.state.current? component.state.current.element : null}</div> : null
    }
  </div>)
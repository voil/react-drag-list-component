/*
 * =============================================================================
 * Project: drag-list-component-typescript
 * Created Date: 2018-03-26, 13:10:42
 * Author: Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
 * =============================================================================
 * Last Modified: 2018-03-26, 14:27:57
 * Modified By: Przemysław Drzewicki
 * =============================================================================
 * Copyright (c) 2018 webonweb
 * =============================================================================
 */
import React from 'react';
import { render } from 'react-dom';

import DragList from "./lib";
 
render(<DragList 
  list={[{ name: 'test1'}, { name : 'test2' }]}
  update={(item, old, next) => {}}
  render={(item, index) => <div key={index}>{item.name}</div>}
/>, document.getElementById('application'));
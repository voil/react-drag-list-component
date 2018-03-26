/*
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
import React from 'react';
import PropTypes from 'prop-types';
import { nodeToString } from "./utils";

import './style.sass';
import template from './template';

/**
 * Main class of component.
 * 
 * @export
 * @class DragList
 * @extends {React.Component}
 */
export default class DragList extends React.Component {
  
  /**
   * Main state of component.
   * 
   * @memberof DragList
   */
  state = {
    current: null,
    target: null,
    placeholder: true
  }

  /**
   * Prototypes for compojent.
   * 
   * @static
   * @memberof DragList
   */
  static propTypes  = {
    list: PropTypes.array.isRequired,
    placeholder: PropTypes.bool,
    update: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired
  }

  /**
   * Creates an instance of DragList.
   * 
   * @param {any} [props={}] 
   * @memberof DragList
   */
  constructor(props = {}){
    super(props);
    this.state.placeholder = this.props.placeholder === true || this.props.placeholder === false? this.props.placeholder : this.state.placeholder;
  }

  /**
   * Handle component will mount event.
   * 
   * @memberof DragList
   */
  componentWillMount = () => 
    window.addEventListener("mousemove", (event) => {
      if(!this.state.current) { return false; }
      this.setState({
        current: {
          ...this.state.current,
          posX: event.clientX,
          posY: event.clientY
        } 
      })
    }); 

  /**
   * Prepare list for handle drag event.
   * 
   * @memberof DragList
   */
  preapre = () => 
    this.props.list.map((item, index) => (
      <div key={`drag-list-${index}`}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}  
        onMouseMove={this.handleMouseMove}
        data-index={index}
      >
        {this.props.render(item, index)}
      </div>))


  /**
   * Handle mouse over event.
   * 
   * @param {any} [event={}] 
   * @memberof DragList
   */
  handleMouseMove = (event = {}) => {
    if(!this.state.current) { return false; }
    this.setState({ target: event.currentTarget.dataset.index })
  }

  /**
   * Handle mouse down event.
   * 
   * @param {any} [event={}] 
   * @memberof DragList
   */
  handleMouseDown = (event = {}) => 
    this.setState({
      current: {
        index: event.currentTarget.dataset.index,
        element: <div dangerouslySetInnerHTML={{ __html: nodeToString(event.target) }} />
      } 
    })

  /**
   * Handle mouse up event.
   * 
   * @param {any} [event={}] 
   * @memberof DragList
   */
  handleMouseUp = (event = {}) => {
    if(!this.state.current) { return false; }
    const index = event.currentTarget.dataset.index? event.currentTarget.dataset.index : this.state.target;
    if(this.state.current.index === index){
      this.setState({ current: null, target: null });
      return false;
    }
    this.props.update(this.props.list[this.state.current.index], this.state.current.index, index);
    this.setState({ current: null, target: null });
  }

  /**
   * Main rendering function.
   *
   * @memberof DragList
   */
  render = () => template(this);
}
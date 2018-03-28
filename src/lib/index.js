/*
 * =============================================================================
 * Project: react-drag-list-component
 * Created Date: 2018-03-26, 13:16:18
 * Author: Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
 * =============================================================================
 * Last Modified: 2018-03-28, 11:41:42
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
   * Main globals settings.
   * 
   * @memberof DragList
   */
  globals = {
    mainClassName: 'drag-list-element'
  }

  /**
   * Main state of component.
   * 
   * @memberof DragList
   */
  state = {
    target: null,
    current: null,
    handler: true,
    propagation: false,
    placeholder: true
  }

  /**
   * Prototypes for compojent.
   * 
   * @static
   * @memberof DragList
   */
  static propTypes  = {
    handler: PropTypes.bool,
    placeholder: PropTypes.bool,
    list: PropTypes.array.isRequired,
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
    this.state.handler = this.props.handler === true || this.props.handler === false? this.props.handler : this.state.handler;
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
        className={this.globals.mainClassName}
        onMouseDown={!this.state.handler? this.handleMouseDown : () => {}}
        onMouseUp={this.handleMouseUp}  
        onMouseMove={this.handleMouseMove}
        data-index={index}
      >
        {this.state.handler? <div
          onMouseDown={this.handleMouseDown}
          className="drag-list-handler"
        >
          <span />
          <span />
          <span />
        </div> : null }
        {this.props.render(item, index)}
      </div>))


  /**
   * Handle mouse over event.
   * 
   * @param {any} [event={}] 
   * @memberof DragList
   */
  handleMouseMove = (event = {}) => {
    if(this.state.propagation) { 
      const parent = event.target.parentElement;
      if(parent.className !== this.globals.mainClassName) { return false; }
      this.startHandleDrag(parent, event);
    }

    if(!this.state.current) { return false; }
    this.setState({ target: event.currentTarget.dataset.index })
  }

  /**
   * Start propagation element drag.
   * 
   * @param {any} [parent={}] 
   * @param {any} [event={}] 
   * @memberof DragList
   */
  startHandleDrag = (parent = {}, event = {}) => {
    const node = this.state.handler? nodeToString(parent).replace('<div class="drag-list-handler"><span></span><span></span><span></span></div>', '')
      : nodeToString(event.target);

    this.setState({
      current: {
        index: this.state.handler? parent.dataset.index: event.currentTarget.dataset.index,
        element: <div dangerouslySetInnerHTML={{ __html: node }} />
      },
      propagation: false
    });
  }

  /**
   * Handle mouse down event.
   * 
   * @param {any} [event={}] 
   * @memberof DragList
   */
  handleMouseDown = (event = {}) => 
    this.setState({ propagation: true });

  /**
   * Handle mouse up event.
   * 
   * @param {any} [event={}] 
   * @memberof DragList
   */
  handleMouseUp = (event = {}) => {
    if(!this.state.current) { 
      this.clear();
      return false; 
    }
    const index = event.currentTarget.dataset.index? event.currentTarget.dataset.index : this.state.target;
    if(this.state.current.index === index || !index || !this.state.current.index){
      this.clear();
      return false;
    }
    this.props.update(this.props.list[this.state.current.index], this.state.current.index, index);
    this.setState({ current: null, target: null, propagation: false });
  }

  /**
   * Clear all state.
   * 
   * @memberof DragList
   */
  clear = () => 
    this.setState({ current: null, target: null, propagation: false });
    
  /**
   * Main rendering function.
   *
   * @memberof DragList
   */
  render = () => template(this);
}
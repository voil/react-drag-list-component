/*
 * =============================================================================
 * Project: react-drag-list-component
 * Created Date: 2018-03-26, 13:33:51
 * Author: Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
 * =============================================================================
 * Last Modified: 2018-03-28, 11:02:18
 * Modified By: Przemysław Drzewicki
 * =============================================================================
 * Copyright (c) 2018 webonweb
 * =============================================================================
 */
import React from 'react';
import DragList from '../src/lib';


const target = document.createElement( "div" );
const currentTarget = { dataset : { index: 1 } };
const wrapper = shallow(<DragList 
  list={[{ name: 'test' }]}
  update={(item, old, next) => {}}
  render={(item, index) => <div key={index}>{item.name}</div>}/>);

test('DragList render component correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Test current element is set', () => {
  const elementList = wrapper.find('div').at(1);
  elementList.simulate('mousedown', { target, currentTarget })

  expect(wrapper.state().current).not.toBe(null);
})

test('Check is placeholder default is set to true', () => {
  expect(wrapper.state().placeholder).toBe(true);
})

test('Check is placeholder hidden', () => {
  const wrapperPlaceholder = shallow(<DragList 
    list={[{ name: 'test' }]}
    placeholder={false}
    update={(item, old, next) => {}}
    render={(item, index) => <div key={index}>{item.name}</div>}/>);

  expect(wrapperPlaceholder.state().placeholder).toBe(false);
})

test('Test target element is set', () => {
  const elementList = wrapper.find('div').at(1);
  elementList.simulate('mousedown', { target, currentTarget });

  elementList.simulate('mousemove', { target, currentTarget });
  expect(wrapper.state().target).not.toBe(null);
})

test('Test current after mouse up', () => {
  const elementList = wrapper.find('div').at(1);
  elementList.simulate('mousedown', { target, currentTarget });

  elementList.simulate('mouseup', { target, currentTarget });

  expect(wrapper.state().current).toBe(null);
  expect(wrapper.state().target).toBe(null);
});
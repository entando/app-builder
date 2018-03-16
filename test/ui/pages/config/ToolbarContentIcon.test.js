import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { WIDGET_LIST, PAGES } from 'state/page-config/const';

import ToolbarContentIcon from 'ui/pages/config/ToolbarContentIcon';

global.console.error = jest.fn();

const handleClickMock = jest.fn();

describe('ToolbarContentIcon', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    component = shallow(<ToolbarContentIcon content={WIDGET_LIST} position="left" />);
    expect(component.exists()).toEqual(true);
  });

  it('errors without required props content and position ', () => {
    shallow(<ToolbarContentIcon />);
    expect(console.error).toHaveBeenCalled();
  });

  it('errors wrong a content', () => {
    shallow(<ToolbarContentIcon content="test" position="left" />);
    expect(console.error).toHaveBeenCalled();
  });

  it('errors wrong a position', () => {
    shallow(<ToolbarContentIcon content={WIDGET_LIST} position="top" />);
    expect(console.error).toHaveBeenCalled();
  });

  it('has a i', () => {
    expect(component.find('i')).toHaveLength(1);
  });

  it('has class ToolbarContentIcon', () => {
    expect(component.hasClass('ToolbarContentIcon')).toBe(true);
  });

  it('has class ToolbarContentIcon--widgets-left', () => {
    expect(component.hasClass('ToolbarContentIcon--widgets-left')).toBe(true);
  });

  it('has class ToolbarContentIcon--widgets-right', () => {
    component = shallow(<ToolbarContentIcon content={WIDGET_LIST} position="right" />);
    expect(component.hasClass('ToolbarContentIcon--widgets-right')).toBe(true);
  });

  it('has class ToolbarContentIcon--pages-right', () => {
    component = shallow(<ToolbarContentIcon content={PAGES} position="right" />);
    expect(component.hasClass('ToolbarContentIcon--pages-right')).toBe(true);
  });

  it('has class ToolbarContentIcon--pages-left', () => {
    component = shallow(<ToolbarContentIcon content={PAGES} position="left" />);
    expect(component.hasClass('ToolbarContentIcon--pages-left')).toBe(true);
  });

  it('has class ToolbarContentIcon--pages-left', () => {
    component = shallow(<ToolbarContentIcon content={PAGES} position="left" />);
    expect(component.hasClass('ToolbarContentIcon--pages-left')).toBe(true);
  });

  it('has class ToolbarContentIcon--pages-left-expanded', () => {
    component = shallow(<ToolbarContentIcon content={PAGES} position="left" toggleExpanded />);
    expect(component.hasClass('ToolbarContentIcon--pages-left-expanded')).toBe(true);
  });

  it('simulate onClick', () => {
    component = shallow(<ToolbarContentIcon handleClick={handleClickMock} content={WIDGET_LIST} position="left" />);
    component.find('i').simulate('click');
    expect(handleClickMock).toHaveBeenCalled();
  });
});

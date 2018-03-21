import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';

import GroupListMenuActions from 'ui/groups/list/GroupListMenuActions';

const EVENT = {
  preventDefault: jest.fn(),
};

const onClickDelete = jest.fn();
const handler = jest.fn();

const props = {
  onClickDelete,
  code: 'group_code',
};

describe('GroupListMenuActions', () => {
  let component;
  beforeEach(() => {
    component = shallow(<GroupListMenuActions {...props} />);
  });

  it('errors without a code', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallow(<GroupListMenuActions />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('has a drop down with kebab button', () => {
    expect(component.find('DropdownKebab')).toHaveLength(1);
  });

  it('has a menuItem with class GroupListMenuAction__menu-item-detail', () => {
    expect(component.find('.GroupListMenuAction__menu-item-detail')).toHaveLength(1);
  });

  it('has a menuItem with class GroupListMenuAction__menu-item-edit', () => {
    expect(component.find('.GroupListMenuAction__menu-item-edit')).toHaveLength(1);
  });

  it('has a menuItem with class GroupListMenuAction__menu-item-delete', () => {
    expect(component.find('.GroupListMenuAction__menu-item-delete')).toHaveLength(1);
  });

  it('clicking on delete MenuItem component calls onClickDelete', () => {
    const deleteButton = component.find('.GroupListMenuAction__menu-item-delete');
    deleteButton.simulate('click', EVENT);
    expect(onClickDelete).toHaveBeenCalled();
  });

  it('should call handler function and preventDefault', () => {
    const result = component.instance().handleClick(handler);
    result(EVENT);
    expect(handler).toHaveBeenCalled();
    expect(EVENT.preventDefault).toHaveBeenCalled();
  });

  it('should call ev.preventDefault only', () => {
    const result = component.instance().handleClick();
    result(EVENT);
    expect(EVENT.preventDefault).toHaveBeenCalled();
  });
});

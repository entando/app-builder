import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';

import RoleListMenuActions from 'ui/roles/list/RoleListMenuActions';

const EVENT = {
  preventDefault: jest.fn(),
};

const onClickDelete = jest.fn();
const handler = jest.fn();

const props = {
  onClickDelete,
  code: 'role_code',
};

describe('RoleListMenuActions', () => {
  let component;
  beforeEach(() => {
    component = shallow(<RoleListMenuActions {...props} />);
  });

  it('errors without a code', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallow(<RoleListMenuActions />);
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

  it('has a menuItem with class RoleListMenuAction__menu-item-delete', () => {
    expect(component.find('.RoleListMenuAction__menu-item-delete')).toHaveLength(1);
  });

  it('clicking on delete MenuItem component calls onClickDelete', () => {
    const deleteButton = component.find('.RoleListMenuAction__menu-item-delete');
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

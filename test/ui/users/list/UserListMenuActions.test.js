import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import UserListMenuActions from 'ui/users/list/UserListMenuActions';

const EVENT = {
  preventDefault: jest.fn(),
};

describe('UserListMenuActions', () => {
  let component;
  beforeEach(() => {
    component = shallow(<UserListMenuActions username="user1" />);
  });

  it('errors without a code', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallow(<UserListMenuActions />);
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

  it('should call handler function and preventDefault', () => {
    const handler = jest.fn();
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

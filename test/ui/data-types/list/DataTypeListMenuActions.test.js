import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import DataTypeListMenuActions from 'ui/data-types/list/DataTypeListMenuActions';

const EVENT = {
  preventDefault: jest.fn(),
};

describe('DataTypeListMenuActions', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DataTypeListMenuActions code="code" />);
  });

  it('errors without a code', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallow(<DataTypeListMenuActions />);
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
    component.instance().handleClick(handler, EVENT);
    expect(handler).toHaveBeenCalled();
    expect(EVENT.preventDefault).toHaveBeenCalled();
  });
});

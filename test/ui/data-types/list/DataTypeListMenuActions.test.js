import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import DataTypeListMenuActions from 'ui/data-types/list/DataTypeListMenuActions';

const onClickDelete = jest.fn();
const onClickReload = jest.fn();

describe('DataTypeListMenuActions', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DataTypeListMenuActions code="code" onClickDelete={onClickDelete} onClickReload={onClickReload} />);
  });

  it('errors without a code', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallow(<DataTypeListMenuActions />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('has a drop down with kebab button', () => {
    expect(component.find('DropdownKebab')).toHaveLength(1);
  });
});

import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import FragmentListMenuActions from 'ui/fragments/list/FragmentListMenuActions';

describe('FragmentListMenuActions', () => {
  let component;
  beforeEach(() => {
    component = shallow(<FragmentListMenuActions code="myCode" />);
  });

  it('errors without a code', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallow(<FragmentListMenuActions />);
    expect(consoleError).toHaveBeenCalledWith('Warning: Failed prop type: The prop `code` is marked as required in `FragmentListMenuActions`, but its value is `undefined`.\n    in FragmentListMenuActions (at FragmentListMenuActions.test.js:15)');
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('has a drop down with kebab button', () => {
    expect(component.find('DropdownKebab')).toHaveLength(1);
  });
});
